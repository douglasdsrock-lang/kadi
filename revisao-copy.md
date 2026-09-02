> **Histórico anterior à correção:** os textos da seção 03 à 11 foram alinhados ao `copy.md` em uma etapa posterior. As diferenças abaixo documentam a versão anterior. Veja `copy-validada.md` para o estado atual.

# Conferência de copy — KADI

Atualização: a comparação completa, com todos os pares de texto e acréscimos por seção, está em [comparacao-copy-detalhada.md](comparacao-copy-detalhada.md). A segunda revisão visual preservou a copy atual.

Comparação feita em 31/08/2026 entre `copy.md` e o `index.html` local. Não foi feita uma comparação com uma versão publicada na internet. O arquivo `copy.md` foi preservado.

**Conclusão: a copy do site não é idêntica à do documento.** As 11 seções estão presentes, na mesma ordem, com a mesma proposta central. Entretanto, vários textos foram expandidos ou reformulados e há condições comerciais adicionais que não constam no documento.

## Comparação por seção

| Seção | Resultado |
| --- | --- |
| 01 · Hero | Headline, subheadline, descrição e CTA coincidem em conteúdo, desconsiderando a marcação visual. O badge foi substituído pelo logotipo, mantendo a identificação KADI / Jabonería Artesanal. Existem extras: faixa de últimas vagas, chamada do vídeo de 2 minutos, acesso imediato e suporte VIP. |
| 02 · Identificação | Os cinco pontos e a frase de fechamento coincidem. O site acrescenta “Reflexiona por un momento” e uma introdução às dúvidas dos iniciantes. |
| 03 · Transformação | Os cinco benefícios foram transformados em títulos e descrições diferentes. O site acrescenta acabamentos profissionais, aromas irresistíveis e renda “constante y rentable desde casa”, entre outros detalhes ausentes no documento. A jornada Aprender → Desarrollar → Lucrar permanece, com numeração. |
| 04 · Professoras | Título, subheadline e parágrafo sobre suporte coincidem. A biografia troca “experiencia y pasión” por “su experiencia y profunda pasión”. Foram acrescentados “Artesanas & Mentoras”, um título para o suporte e um CTA específico. |
| 05 · Método | Os seis títulos coincidem. Todas as seis descrições estão ampliadas ou reformuladas. O site acrescenta química, técnicas de vertido, fornecedores, packaging, divulgação em redes e “alta ganancia”. |
| 06 · Diferencial | Headline, descrição do KADI e citação coincidem. A descrição de outros cursos é mais longa. O rótulo “KADI” vira “KADI Jabonería”. Há eyebrow e introdução extras. |
| 07 · Bônus | Títulos e identificação dos três bônus coincidem. As três descrições diferem. O site acrescenta difusores, sais, óleos essenciais, ingredientes 100% naturais e etiquetas para imprimir. A condição de bônus grátis ao se inscrever hoje também é adicional. |
| 08 · Oferta | Headline, preço de €54,99 e CTA coincidem. A lista inclui “paso a paso”, “Natural” e “Plantillas”, ausentes na lista do documento. “WhatsApp / Telegram” tem diferença apenas de espaçamento. O site acrescenta preço anterior de €120,00, oferta de lançamento, pagamento único, acesso ilimitado/vitalício, pagamento seguro e entrega imediata. |
| 09 · Garantia | Antes desta revisão, título e parágrafo eram ampliados (“Incondicional”, “días enteros”, “sin complicaciones”). Nesta revisão visual, o título e o parágrafo principal foram alinhados literalmente ao documento, desconsiderando HTML/espaçamento. O selo, os rótulos editoriais, o destaque de 100% e o link para a oferta são complementos visuais. |
| 10 · FAQ | As quatro perguntas coincidem. Todas as quatro respostas diferem, com expansões ou reformulação. Há detalhes adicionais como consulta a qualquer momento e geração de renda rapidamente. |
| 11 · Fechamento | Headline, parágrafo e CTA coincidem em conteúdo. O ícone decorativo foi removido e uma seta funcional foi acrescentada ao botão. |

## Exemplos objetivos

- **Módulo 1, documento:** “La base que nadie te explica bien.”
  **Site:** “La base sólida y clara que nadie te explica bien, para que entiendas la química y los secretos esenciales.”
- **Bônus 2, documento:** “Aprende a crear otro producto artesanal de alta demanda.”
  **Site:** “Aprende a crear otro producto artesanal spa de alta demanda con sales, aceites esenciales e ingredientes 100% naturales.”
- **FAQ 1, documento:** “No. KADI fue creado para quienes están empezando desde absoluto cero.”
  **Site:** “No. KADI fue creado precisamente para quienes están empezando desde absoluto cero, guiándote paso a paso en cada proceso.”

## Informações extras que precisam de validação comercial

O `copy.md` não confirma o preço anterior de €120,00, acesso vitalício/ilimitado, escassez de vagas, duração de 2 minutos do vídeo, consulta a qualquer momento ou especificações adicionais dos módulos e bônus. Não é possível concluir apenas pelos arquivos se essas afirmações são verdadeiras. Foram preservadas nesta revisão de design, sem uma sincronização integral da copy.

## Pendências existentes fora da revisão visual

- O vídeo aponta para `dQw4w9WgXcQ`, um endereço provisório que não corresponde à apresentação KADI.
- O botão “QUIERO EMPEZAR AHORA” volta para `#hero`, sem checkout configurado.
- O WhatsApp usa o número de exemplo `5511999999999`.
- As notificações de inscrições são simuladas em `assets/js/script.js`: nomes, cidades e horários vêm de uma lista fixa, sem registros de compra. Não devem ser interpretadas como prova de inscrições reais.

Essas integrações e notificações não foram alteradas. Devem ser revisadas antes de usar a página para vendas reais.

## Alterações visuais realizadas

- Marca vetorial original em SVG para hero, rodapé e favicon, com símbolo de sabonete em camadas.
- Remoção dos brilhos, emojis decorativos e ícones genéricos dos títulos, botões e cards. Cards de transformação e módulos passam a usar numeração tipográfica.
- Remoção da dependência externa de Lucide; play, check, seta de FAQ e contato permanecem como elementos funcionais locais.
- Garantia com selo próprio, duas colunas no desktop e composição vertical no celular.
- Ajustes de grades, faixas e rodapé para telas pequenas; estado acessível do FAQ, foco de teclado e respeito à preferência por movimento reduzido.
- Fundo suave na hero mobile para evitar que a foto fique atrás do título; o fundo fotográfico do desktop foi preservado.

## Verificação

Layout inspecionado em larguras de 320, 390, 768 e 1280 px, sem elementos do conteúdo ou rodapé ultrapassando a largura da tela. Hero e garantia foram conferidas visualmente em desktop e celular. A abertura/fechamento do FAQ foi verificada, incluindo atualização de `aria-expanded` e `inert`. Imagens e destinos das âncoras locais foram conferidos, sem falhas. JavaScript passou em `node --check`, os três SVGs são XML válido e o parágrafo principal da garantia coincide com o `copy.md` após remover a marcação HTML. Nenhuma publicação foi realizada.
