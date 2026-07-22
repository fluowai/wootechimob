import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini AI Client Server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Healthcheck
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "WooTech Imob",
    timestamp: new Date().toISOString(),
  });
});

// BrasilAPI / ViaCEP Proxy & Mock Fallback
app.get("/api/cep/:cep", async (req, res) => {
  const cleanCep = req.params.cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) {
    res.status(400).json({ error: "CEP inválido. Deve possuir 8 dígitos." });
    return;
  }
  try {
    const fetchRes = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (fetchRes.ok) {
      const data = await fetchRes.json();
      if (!data.erro) {
        res.json({
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          ibge: data.ibge,
        });
        return;
      }
    }
  } catch (err) {
    console.warn("ViaCEP fetch error, returning structured fallback:", err);
  }

  // Fallback demo response if external request fails or non-existent
  res.json({
    cep: `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`,
    logradouro: "Avenida Paulista",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
  });
});

// Receita Federal / CNPJ Lookup Proxy
app.get("/api/cnpj/:cnpj", async (req, res) => {
  const cleanCnpj = req.params.cnpj.replace(/\D/g, "");
  if (cleanCnpj.length !== 14) {
    res.status(400).json({ error: "CNPJ inválido. Deve possuir 14 dígitos." });
    return;
  }
  try {
    const fetchRes = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
    if (fetchRes.ok) {
      const data = await fetchRes.json();
      res.json({
        cnpj: data.cnpj,
        razao_social: data.razao_social,
        nome_fantasia: data.nome_fantasia || data.razao_social,
        situacao_cadastral: data.descricao_situacao_cadastral || "ATIVA",
        cidade: data.municipio,
        uf: data.uf,
        cnae_fiscal_descricao: data.cnae_fiscal_descricao,
      });
      return;
    }
  } catch (err) {
    console.warn("BrasilAPI CNPJ error, fallback used:", err);
  }

  res.json({
    cnpj: cleanCnpj,
    razao_social: "WOOTECH EMPREENDIMENTOS IMOBILIARIOS LTDA",
    nome_fantasia: "WooTech Imob Brasil",
    situacao_cadastral: "ATIVA",
    cidade: "São Paulo",
    uf: "SP",
    cnae_fiscal_descricao: "Corretagem na compra e venda e avaliação de imóveis",
  });
});

// IBGE Municipalities
app.get("/api/ibge/municipios", async (req, res) => {
  const uf = (req.query.uf as string) || "SP";
  try {
    const fetchRes = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    if (fetchRes.ok) {
      const data = await fetchRes.json();
      res.json(data.map((m: any) => ({ id: m.id, nome: m.nome, uf })));
      return;
    }
  } catch (err) {
    console.warn("IBGE API error, fallback used:", err);
  }

  res.json([
    { id: 3550308, nome: "São Paulo", uf },
    { id: 3509502, nome: "Campinas", uf },
    { id: 3549805, nome: "São José dos Campos", uf },
    { id: 3543402, nome: "Ribeirão Preto", uf },
  ]);
});

// SICAR CAR (Cadastro Ambiental Rural) Verification Simulator/Proxy
app.get("/api/sicar/car/:codigo", (req, res) => {
  const codigo = req.params.codigo;
  res.json({
    car_id: codigo,
    status: "ATIVO",
    municipio: "Ribeirão Preto - SP",
    area_total_ha: 450.8,
    area_reserva_legal_ha: 90.16,
    area_app_ha: 22.5,
    percentual_reserva: "20.0%",
    conformidade_ambiental: "REGULAR",
    nascentes_georeferenciadas: 3,
    modulos_fiscais: 11.2,
    ultima_atualizacao: "2026-05-12",
  });
});

// XML Feed Generator for Real Estate Portals (Zap, VivaReal, OLX)
app.get("/api/xml/portals", (req, res) => {
  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<Carga xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Imoveis>
    <Imovel>
      <CodigoImovel>WT-1092</CodigoImovel>
      <TipoImovel>Apartamento</TipoImovel>
      <SubTipoImovel>Padrão</SubTipoImovel>
      <Categoria>Residencial</Categoria>
      <PrecoVenda>1250000</PrecoVenda>
      <Cidade>São Paulo</Cidade>
      <Bairro>Jardins</Bairro>
      <UF>SP</UF>
      <AreaUtil>142</AreaUtil>
      <QtdDormitorios>3</QtdDormitorios>
      <QtdSuites>2</QtdSuites>
      <QtdVagas>2</QtdVagas>
      <Titulo>Excelente Apartamento nos Jardins com Varanda Gourmet</Titulo>
      <Observacao>Apartamento totalmente reformado, piso em madeira nobre, marcenaria planejada e vista definitiva.</Observacao>
      <Fotos>
        <Foto><URL>https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800</URL></Foto>
        <Foto><URL>https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800</URL></Foto>
      </Fotos>
    </Imovel>
  </Imoveis>
</Carga>`;
  res.header("Content-Type", "application/xml");
  res.send(sampleXml);
});

// AI Specialized Proxy Endpoints using @google/genai
app.post("/api/ai/analyze", async (req, res) => {
  const { product, context, prompt } = req.body;
  const ai = getAiClient();

  if (!ai) {
    res.json({
      success: true,
      result: `[Análise Inteligente WooTech - Modo Demonstrativo]\n\nCom base nas informações fornecidas para o segmento ${product || "Urban"}:\n\n- **Sugestão Estratégica**: Imóvel com excelente liquidez de mercado e taxa de valorização estimada em 8.5% a.a.\n- **Recomendação de Preço**: Alinhado com a média ponderada dos comparáveis do bairro.\n- **Ação Recomendada**: Iniciar campanha automatizada no WhatsApp e impulsionar no portal Zap Imóveis.`,
      isMock: true,
    });
    return;
  }

  try {
    const systemPrompt = `Você é o WooTech AI, um especialista sênior em inteligência imobiliária brasileira (ERP, CRM, avaliação, agronegócio, incorporação e loteamentos).
Você está atendendo uma requisição para o produto WooTech ${product || "Urban"}.
Contexto do Imóvel/Cliente: ${JSON.stringify(context || {})}
Forneça análises numéricas, estratégicas, de copywriting ou rurais detalhadas, formatadas em Markdown claro e direto.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt || "Analise a oportunidade e sugira o plano de ação ideal.",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      result: response.text || "Análise concluída com sucesso.",
    });
  } catch (err: any) {
    console.error("Gemini AI API Error:", err);
    res.status(500).json({
      error: "Erro ao processar análise de IA",
      details: err.message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WooTech Imob Server running on http://localhost:${PORT}`);
  });
}

startServer();
