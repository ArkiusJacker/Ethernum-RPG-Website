const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, PageNumber, PageBreak
} = require('docx');
const fs = require('fs');

// Colors
const PURPLE     = "4A3F8F";
const PURPLE_L   = "EEEDFE";
const TEAL       = "0F6E56";
const TEAL_L     = "E1F5EE";
const AMBER      = "854F0B";
const AMBER_L    = "FAEEDA";
const RED        = "A32D2D";
const RED_L      = "FCEBEB";
const GRAY_L     = "F5F5F3";
const GRAY_M     = "E0DED8";
const BLUE       = "0C447C";
const BLUE_L     = "E6F1FB";
const GREEN      = "27500A";
const GREEN_L    = "EAF3DE";
const WHITE      = "FFFFFF";
const BLACK      = "1A1A1A";
const DARK_GRAY  = "444441";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function spacer(pt = 80) {
  return new Paragraph({ spacing: { before: pt, after: pt }, children: [] });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, font: "Arial", size: 32, color: PURPLE })],
    spacing: { before: 320, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: PURPLE_L, space: 4 } }
  });
}

function heading2(text, color = DARK_GRAY) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, font: "Arial", size: 26, color })],
    spacing: { before: 240, after: 120 }
  });
}

function heading3(text, color = DARK_GRAY) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, font: "Arial", size: 22, color })],
    spacing: { before: 180, after: 80 }
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Arial", size: 20, color: BLACK, ...opts })],
    spacing: { before: 60, after: 60 }
  });
}

function italic(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: "Arial", size: 20, color: DARK_GRAY, italics: true })],
    spacing: { before: 40, after: 40 }
  });
}

function tagColor(tipo) {
  switch(tipo) {
    case "utilitário":  return { bg: TEAL_L,   fg: TEAL };
    case "GM tool":     return { bg: PURPLE_L, fg: PURPLE };
    case "social":      return { bg: AMBER_L,  fg: AMBER };
    case "toon":        return { bg: AMBER_L,  fg: "633806" };
    case "lendário":    return { bg: RED_L,     fg: RED };
    case "aberto":      return { bg: GRAY_L,   fg: DARK_GRAY };
    default:            return { bg: GRAY_L,   fg: DARK_GRAY };
  }
}

// Stage badge row
function stageBadge(label, die, title, badgeColor, badgeBg, stat) {
  const W = 9360;
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [1800, 1000, 6560],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: badgeBg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: label, bold: true, font: "Arial", size: 18, color: badgeColor })]
          })]
        }),
        new TableCell({
          borders: noBorders,
          width: { size: 1000, type: WidthType.DXA },
          shading: { fill: WHITE, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: die, bold: true, font: "Arial", size: 28, color: PURPLE })]
          })]
        }),
        new TableCell({
          borders: noBorders,
          width: { size: 6560, type: WidthType.DXA },
          shading: { fill: WHITE, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              children: [new TextRun({ text: title, bold: true, font: "Arial", size: 22, color: BLACK })]
            }),
            new Paragraph({
              children: [new TextRun({ text: stat, font: "Arial", size: 18, color: DARK_GRAY, italics: true })]
            })
          ]
        })
      ]
    })]
  });
}

// Effect row in table
function effectRow(num, name, tipo, desc, isAlt) {
  const tc = tagColor(tipo);
  const W = 9360;
  const bg = isAlt ? GRAY_L : WHITE;
  return new TableRow({
    children: [
      new TableCell({
        borders: noBorders,
        width: { size: 700, type: WidthType.DXA },
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 80 },
        verticalAlign: VerticalAlign.TOP,
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: num, bold: true, font: "Arial", size: 18, color: DARK_GRAY })]
        })]
      }),
      new TableCell({
        borders: noBorders,
        width: { size: 2200, type: WidthType.DXA },
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 80, right: 120 },
        verticalAlign: VerticalAlign.TOP,
        children: [
          new Paragraph({
            children: [new TextRun({ text: name, bold: true, font: "Arial", size: 20, color: BLACK })]
          }),
          new Paragraph({
            children: [new TextRun({ text: tipo, font: "Arial", size: 16, color: tc.fg })]
          })
        ]
      }),
      new TableCell({
        borders: noBorders,
        width: { size: 6460, type: WidthType.DXA },
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.TOP,
        children: [new Paragraph({
          children: [new TextRun({ text: desc, font: "Arial", size: 19, color: BLACK })]
        })]
      })
    ]
  });
}

function sectionTable(effects) {
  const W = 9360;
  // Header row
  const headerRow = new TableRow({
    children: [
      new TableCell({
        borders: noBorders,
        width: { size: 700, type: WidthType.DXA },
        shading: { fill: PURPLE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 80 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "#", bold: true, font: "Arial", size: 18, color: WHITE })]
        })]
      }),
      new TableCell({
        borders: noBorders,
        width: { size: 2200, type: WidthType.DXA },
        shading: { fill: PURPLE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 80, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: "Nome / Tipo", bold: true, font: "Arial", size: 18, color: WHITE })]
        })]
      }),
      new TableCell({
        borders: noBorders,
        width: { size: 6460, type: WidthType.DXA },
        shading: { fill: PURPLE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: "Descrição mecânica", bold: true, font: "Arial", size: 18, color: WHITE })]
        })]
      })
    ]
  });

  const rows = [headerRow, ...effects.map((e, i) => effectRow(e[0], e[1], e[2], e[3], i % 2 === 0))];
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [700, 2200, 6460], rows });
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const effects_1_20 = [
  ["1",  "Chave que não existe",         "utilitário", "Abre qualquer fechadura não mágica com sucesso automático. Some em 10 minutos. Se usada em uma fechadura narrativamente proibida: destrói a fechadura e some imediatamente."],
  ["2",  "Corda incerta",                "utilitário", "Rola 1d2 (narrativo): 1 = 3 metros, 2 = 6 metros. Kaitake não sabe o tamanho até esticá-la. Dura 1 hora e some."],
  ["3",  "Bilhete com dica",             "GM tool",    "Frase verdadeira, nunca completamente útil. Ferramenta de foreshadow do GM. Some após lido. Após estágio d50: sempre preciso e cirúrgico."],
  ["4",  "Distração (quase) perfeita",   "social",     "Kaitake tem 1 rodada para jogar o objeto. Se jogar: Deception vs Perception dos inimigos. Se não agir: o objeto faz barulho na mão dela — todos na cena fazem Perception DC 15 passivo."],
  ["5",  "Consumível aleatório",         "utilitário", "Rola 1d8: (1) Smokestick · (2) Antidote · (3) Antiplague · (4) Elixir of Life nv.1 · (5) Blight Bomb · (6) Bottled Lightning · (7) Alchemist's Fire · (8) Acid Flask. Todos nível 1–3."],
  ["6",  "Dado de cristal",              "utilitário", "A próxima rolagem de Kaitake ou de um aliado indicado tem Fortuna (rola 2 dados, usa o melhor). O dado some após o uso ou no fim da cena."],
  ["7",  "Dobro com nada",               "toon",       "Item útil (GM escolhe entre resultados 1–6) + objeto absurdo indistinguível. Kaitake não sabe qual é qual até tentar usar. Chinko parece satisfeito com a confusão."],
  ["8",  "Confete dramático",            "social",     "Mini-explosão de confete. Aliados visíveis ganham +1 moral em iniciativa neste encontro (não acumulável). Inimigos: Will DC 13 ou ficam Distracted por 1 rodada."],
  ["9",  "Espelho de bolso",             "utilitário", "Kaitake troca de posição com um aliado voluntário em alcance de 9m. Ambos devem estar de pé. Teleporte instantâneo, sem provocar ataques de oportunidade. 1 uso, some depois."],
  ["10", "Carta em branco",              "GM tool",    "O GM descreve um objeto absurdo que aparece na mão de Kaitake. Nenhum efeito mecânico. Some em 1 hora. Ferramenta de worldbuilding e piada de mesa."],
  ["11", "Anvil Warning",                "toon",       "Uma plaquinha minúscula com uma seta apontando para cima aparece. Em 1d3 rodadas, algo cai sobre um inimigo à escolha do GM: 2d6 bludgeoning (Reflex DC 15, básico). Kaitake sabe quando vai cair. Os outros não."],
  ["12", "Porta pintada na parede",      "toon",       "Kaitake pode atravessar como se fosse real. Inimigos que tentarem batem na parede (1 dano, Stunned 1). A porta some após Kaitake passar ou no fim de sua próxima rodada."],
  ["13", "Gravidade negociável",         "toon",       "Kaitake ignora a gravidade por 1 rodada completa — pode andar em paredes, teto, ou flutuar. Termina no início do seu próximo turno. Cair depois disso é normal."],
  ["14", "Furo no espaço",               "toon",       "Um buraco aparece no chão. Qualquer inimigo que pisar cai 1 andar (2d6 bludgeoning, Reflex DC 14, básico). Dura 2 rodadas ou até ser recolhido por Kaitake."],
  ["15", "Poção de impulso",             "utilitário", "Recupera 2 pontos de Impulso imediatamente. Sem sistema de Impulso: Fast Healing 3 por 1 rodada."],
  ["16", "Corredor de mentira",          "toon",       "Corredor ilusório pintado em qualquer superfície plana. DC 16 Perception para desacreditar. Inimigos que entrarem são redirecionados para trás. Aliados atravessam normalmente. Dura 3 rodadas."],
  ["17", "Fichas de casino",             "utilitário", "+80 PO em fichas de um cassino de origem incerta. Aceitas como moeda em locais cosmopolitas. Em locais remotos: item de barganha ou curiosidade."],
  ["18", "Sombra independente",          "toon",       "A sombra de Kaitake age por conta própria por 1 minuto: pode flanquear, carregar objetos leves, e fingir que há duas Kaitakes. Não ataca. Desaparece ao fim do efeito ou se atingida por luz intensa."],
  ["19", "Pausa dramática",              "toon",       "O tempo para por 1 segundo narrativo. Kaitake pode dizer uma frase. Todos ouvem, mesmo que não devessem. Sem efeito mecânico — deixa de roleplay ao critério do GM."],
  ["20", "Chinko decide",                "GM tool",    "O GM escolhe livremente qualquer efeito da tabela. Chinko sabe exatamente o que está fazendo. Ou não. Difícil dizer."],
];

const effects_21_50 = [
  ["21", "Escada de bolso",              "utilitário", "Escada extensível de origem incerta. Sobe até 6m verticalmente. Não suporta mais de 2 pessoas ao mesmo tempo ou ela 'cansa'. Dura 10 minutos."],
  ["22", "Barril de pólvora sem pólvora","toon",       "Barril idêntico ao real. Ao ser aberto revela confete, sardinha seca ou palha — o GM decide. Funciona como distração ou objeto de arremesso (2d4 bludgeoning). Nunca explode."],
  ["23", "Guarda-chuva do avesso",       "toon",       "Protege todos ao redor de Kaitake da chuva. Não protege Kaitake. Sob sol forte: vira um chapéu de praia para ela automaticamente."],
  ["24", "Pombo mensageiro relutante",   "utilitário", "Pombo com carta em branco. Entende destinos simples ditos em voz alta. Retorna em 1d4 horas. Pode exigir Nature DC 12 para convencê-lo a ir."],
  ["25", "Gangorra tática",              "toon",       "Aparece entre Kaitake e um inimigo adjacente. Kaitake pode gastar 1 Ação: Athletics DC 15 do inimigo ou ele voa 3m e cai Prone. Some após 1 rodada."],
  ["26", "Espelho que discorda",         "toon",       "Ao ser mostrado a alguém, o reflexo dessa pessoa faz o oposto do que ela faz. Will DC 14 ou o alvo fica Fascinated por 1 rodada pela confusão."],
  ["27", "Tapete que pensa",             "toon",       "Tapete 2x2m. Qualquer inimigo que pisar cai Prone (Reflex DC 15). Aliados passam normalmente. Não pode ser dobrado enquanto alguém estiver em cima. Dura 2 minutos."],
  ["28", "Luneta da inveja",             "utilitário", "Mostra qualquer coisa à distância. Se apontada para um inimigo, revela o item mais valioso que ele carrega. 1 uso por invocação."],
  ["29", "Trilha sonora",                "social",     "Música dramática e adequada ao momento começa a tocar de lugar nenhum. Aliados ganham +1 moral em saves contra Fear enquanto durar. Dura 1 minuto ou até Kaitake ordenar parar."],
  ["30", "Bigode de autoridade",         "social",     "Todos na cena ganham bigodes imponentes por 10 minutos. Kaitake ganha vantagem em Intimidation e Diplomacy enquanto durar. Remover o bigode encerra o efeito."],
  ["31", "Sinal de saída",               "utilitário", "Placa luminosa SAÍDA aparece flutuando e aponta para a saída mais próxima do ambiente. Não distingue 'segura' de 'armadilha'. Dura 5 minutos."],
  ["32", "Ancinho no caminho",           "toon",       "Um ancinho aparece deitado no chão à frente de um inimigo à escolha. Se ele se mover para aquela casa: bate na cara (2d4, Stunned 1, Reflex DC 13 para desviar)."],
  ["33", "Mola no chão",                 "utilitário", "Mola gigante no chão. Qualquer criatura que pisar voa 6m na direção em que estava se movendo (Reflex DC 14 para controlar o pouso). Kaitake pode ativar voluntariamente. Dura 2 rodadas."],
  ["34", "Balde d'água do nada",         "toon",       "Um balde cai sobre um inimigo à escolha. Sem dano. Se o inimigo usar fogo ou pólvora, todas as suas fontes de fogo se apagam por 1d4 rodadas."],
  ["35", "Piano suspenso",               "toon",       "Um piano de cauda aparece suspenso sobre um inimigo à escolha. Cai ao fim da rodada ou quando Kaitake quiser: 4d6 bludgeoning (Reflex DC 16, básico). Some após cair."],
  ["36", "Troca de roupa instantânea",   "social",     "Kaitake e aliados voluntários recebem um figurino temático (GM escolhe o tema). Conta como disfarce de qualidade razoável (Deception +2 para infiltração), mas obviamente estranho."],
  ["37", "Megafone da verdade",          "social",     "Amplifica tudo que Kaitake diz ao triplo do volume. Mentiras soam como verdade absoluta (Deception +4), mas Kaitake não pode sussurrar enquanto o segura. Dura 10 minutos."],
  ["38", "Corrente de papel",            "utilitário", "Corda feita de origamis encadeados. Incrivelmente resistente (suporta até 400kg, Bulk 0). Parece ridícula — inimigos raramente tentam cortá-la por não acreditarem. Dura 1 hora."],
  ["39", "Bandeira de rendição que insulta","social",  "Kaitake ergue a bandeira. Inimigos que virem: Will DC 15 ou ficam Flat-footed por 1 rodada. Não afeta criaturas sem ego ou mortos-vivos."],
  ["40", "Porta dos fundos",             "utilitário", "Uma porta real aparece em qualquer parede sólida. Leva a um corredor neutro de 10m que termina em outra parede à escolha de Kaitake. Desaparece após todos passarem ou em 1 minuto."],
  ["41", "Pato de borracha oracular",    "toon",       "Faz barulho quando algo invisível se aproxima a 9m. Se espremido voluntariamente: Chinko confirma mentalmente se há perigo imediato (resposta sim/não). Dura 24 horas."],
  ["42", "Escalada grátis",              "utilitário", "Kaitake e até 2 aliados ganham Speed de Escalada igual à Speed de movimento por 1 hora. Deixam rastro de pontos de interrogação nas superfícies escaladas. Efeito visual apenas."],
  ["43", "Espelho do inimigo",           "toon",       "A próxima magia de alvo único disparada contra Kaitake é refletida de volta ao conjurador (funciona como Counterspell, cômico). O espelho racha depois. 1 uso."],
  ["44", "Relógio que atrasa",           "toon",       "Um inimigo à escolha acha que sua iniciativa é 1d4 mais baixa. Na próxima rodada ele age no slot errado. Will DC 16 ou Perception para perceber o truque."],
  ["45", "Dinamite de mentira",          "toon",       "Parece dinamite real. Se jogada, inimigos em alcance de 6m: Will DC 14 ou usam 1 Reação para se jogar Prone. Ela não explode. Nunca explode. Mas ninguém precisa saber disso."],
  ["46", "Gatinho cinza",                "toon",       "Um gato emerge, olha ao redor com desdém e entra de volta. Se impedido de sair: senta no ombro de Kaitake por 1 hora e concede +1 em Perception passiva. Não faz mais nada."],
  ["47", "Mapa incorreto precioso",      "GM tool",    "Mapa detalhado de um lugar real na campanha. Distâncias dobradas, norte e sul trocados. As anotações parecem sérias e contêm 1 informação verdadeira escondida entre os erros."],
  ["48", "Poção de crescimento parcial", "toon",       "Kaitake cresce o dobro do tamanho — apenas da cintura para cima — por 1 rodada. Ganha Reach de 3m e +2 em Athletics nesse turno. Sapatos não acompanham."],
  ["49", "Livro de regras impossível",   "GM tool",    "Livro com regras para situações absurdas e hiper-específicas. O GM pode usá-lo para resolver qualquer situação estranha com 'autoridade oficial'. Some após 3 consultas."],
  ["50", "Chinko aparece",               "GM tool",    "Chinko se manifesta brevemente em forma física (GM descreve). Concede 1 informação verdadeira à escolha do GM — pode ser séria ou absurda. Desaparece antes de qualquer pergunta de acompanhamento."],
];

const effects_51_70 = [
  ["51", "Cópia de emergência",          "toon",       "Clone de papelão de Kaitake aparece em seu lugar. Absorve o próximo ataque automaticamente (Perception DC 17 para inimigos perceberem). Some após 1 golpe ou 1 rodada."],
  ["52", "Aceleração de desenho animado","toon",       "+4 na Speed e 1 Ação Stride extra gratuita neste turno. Deixa nuvem de poeira. Se bater em parede: Stunned 1, sem dano."],
  ["53", "Queda segura estilosa",        "utilitário", "Kaitake ou aliado à escolha ignora completamente a próxima queda, independente da altura. Pousa em pé com nuvem de poeira. Ativa automaticamente. 1 uso."],
  ["54", "Baú do tesouro falso",         "toon",       "Baú que parece rico (brilha, tilinta). Inimigos: Will DC 16 ou gastam 1 Ação para abrir. Dentro: uma sardinha. O baú some depois, levando a sardinha."],
  ["55", "Megafone do caos",             "toon",       "Todos os inimigos que puderem ouvir trocam de alvo entre si por 1 rodada (atacam o aliado mais próximo deles). Will DC 17. Criaturas sem linguagem são imunes."],
  ["56", "Terreno escorregadio localizado","toon",     "Zona de 4x4m coberta de bananas, graxa ou sabão (GM escolhe). Acrobatics DC 14 para cruzar sem cair Prone. Aliados que souberem podem contornar. Dura 3 rodadas."],
  ["57", "Chapéu dentro do chapéu",      "toon",       "Cartola idêntica, menor, sem poderes. Colocada na cabeça de alguém: essa pessoa fica convicta de ser um grande mágico por 10 minutos (Will DC 15 para resistir)."],
  ["58", "Looping geográfico",           "toon",       "Uma sala ou corredor de até 20m vira um loop por 2 rodadas. Inimigos que tentarem sair voltam pela outra extremidade. Kaitake e aliados sabem do loop e podem sair normalmente."],
  ["59", "Fumaça de identidade",         "social",     "Kaitake e até 3 aliados parecem ser pessoas completamente diferentes por 10 minutos (aparência, voz, postura). Não requer magia. Perception DC 18 para desmascarar."],
  ["60", "Seta que não mente",           "utilitário", "Seta flutuante aponta para o objetivo principal de Kaitake naquele momento (GM interpreta). Sempre aponta para a coisa certa, mas pode ser cruelmente literal. Dura 1 hora ou até chegar."],
  ["61", "Espelho paralelo",             "toon",       "Kaitake entra em um espelho e sai por qualquer espelho a até 100m que ela já tenha visto. Aliados podem seguir (1 por rodada). O espelho de origem some após o último passar."],
  ["62", "Inimigo em câmera lenta",      "toon",       "Um inimigo à escolha fica Slow 1 por 1 rodada (perde 1 Ação). Ele percebe que está em câmera lenta, mas não pode fazer nada a respeito. Will DC 17."],
  ["63", "Chuva localizada de peixes",   "toon",       "Chuva de peixes vivos em zona de 6m por 1 rodada. Todos na área: 2d4 bludgeoning (Reflex DC 15, básico) e ficam Flat-footed por 1 rodada. Kaitake está imune."],
  ["64", "Explosão de tinta",            "toon",       "Inimigo coberto de tinta brilhante não pode se esconder por 1 minuto — ignora Invisibility e Concealment. A cor é escolhida pelo GM e combina com o ambiente da pior forma possível."],
  ["65", "Escada rolante que não existe","toon",       "Escada rolante invisível entre dois pontos a até 12m. 1 Ação = 12m de movimento instantâneo. Inimigos que tentarem usar caem. Dura 3 rodadas."],
  ["66", "O número da sorte",            "utilitário", "Ticket numerado. Kaitake pode usá-lo para substituir qualquer resultado de dado — dela ou de aliado adjacente — antes ou depois de rolar. 1 uso, some ao fim do encontro se não usado."],
  ["67", "Fita métrica do destino",      "GM tool",    "Mede qualquer coisa — distância, dívidas morais, mentiras ditas na sessão. Os números aparecem em unidades inventadas. O GM decide o que cada leitura significa narrativamente."],
  ["68", "Túnel de papel",               "toon",       "Kaitake atravessa qualquer parede não mágica de até 1m de espessura como se fosse papel. A parede não sofre dano. Inimigos que tentarem seguir batem. 1 uso."],
  ["69", "Lupa da fraqueza",             "utilitário", "Kaitake observa um inimigo com 1 Ação. O GM revela 1 fraqueza mecânica (vulnerabilidade, save mais baixo, condição especial). 1 uso por criatura."],
  ["70", "Bomba de fumaça cômica",       "utilitário", "Smoke Bomb avançada em zona de 6m. Além do efeito normal, Fort DC 15 ou Sickened 1 por 1 rodada (cheiro de peixe e confete)."],
];

const effects_71_75_open = [
  ["71–75", "Slots abertos — autoral do GM", "GM tool",
   "Reservados para o GM criar efeitos específicos da campanha. Podem incorporar NPCs, locais ou eventos recentes. O caos de Chinko conhece o mundo da Kaitake."],
];

const effects_76_90 = [
  ["76", "Chuva de ouro",               "lendário",   "+200 PO em moedas genuínas caem do nada. Fazem muito barulho. Todos na cena percebem. Chinko parece muito satisfeito consigo mesmo."],
  ["77", "Duplicata de combate frágil", "lendário",   "Cópia de Kaitake aparece com 1 HP e age no próximo turno dela com -2 em todas as rolagens. Some após o primeiro golpe ou ao fim da rodada seguinte. Não pode usar a Cartola."],
  ["78", "Iniciativa invertida",        "lendário",   "Um inimigo à escolha age por último nesta rodada, independente da iniciativa dele. Will DC 19. Ele percebe, mas já é tarde. Imune: criaturas sem mente."],
  ["79", "A coisa certa, na hora certa","lendário",   "O GM entrega a Kaitake o que ela precisa agora — não o que quer. Pode ser um item, uma informação, uma saída ou uma conversa. Chinko é cirúrgico quando quer."],
  ["80", "Negação pessoal",             "lendário",   "Kaitake declara que ela mesma não foi atingida pelo último efeito físico que a afetou (apenas ela, apenas efeitos físicos, 1 vez). Consequências narrativas continuam normalmente. 1x por arco narrativo."],
  ["81–85", "Slots abertos — GM lendário","GM tool",  "Efeitos de peso narrativo ligados a marcos da campanha. O GM pode preparar esses slots com antecedência para momentos de virada. Altamente recomendado conectar à história de Kaitake."],
  ["86", "Inversão de aliança",         "lendário",   "Um inimigo não-chefe torna-se aliado temporário por 1d4 rodadas (Will DC 20). Age na iniciativa de Kaitake com seus stats originais. Retorna ao estado normal quando o efeito acaba."],
  ["87", "Gravidade invertida localizada","lendário", "Apenas inimigos em zona de 12m são afetados pela inversão de gravidade por 1 rodada. Kaitake e aliados sabem com 1 rodada de antecedência. Reflex DC 18 para se agarrar a algo."],
  ["88", "O item que devia estar lá",   "lendário",   "Um item mundano que o grupo esqueceu de comprar ou perdeu em algum momento da campanha aparece — exatamente aquele, exatamente agora. Chinko sempre lembrava."],
  ["89", "Eco do passado",              "GM tool",    "Uma versão de Kaitake de 1 minuto no passado aparece e age uma vez (GM descreve o que ela fez 'um minuto atrás' que se torna real agora). Não pode alterar eventos já resolvidos."],
  ["90", "Hesitação coletiva",          "lendário",   "Inimigos não-chefe recuam ou ficam hesitantes por 1d4 rodadas (Will DC 18). O encontro continua, mas o grupo ganha fôlego. O GM decide o comportamento dos inimigos afetados."],
];

const effects_91_100 = [
  ["91–98", "Slots autorais lendários", "aberto",     "Os 8 slots mais raros da tabela. Reservados para o GM criar efeitos únicos ligados à história de Kaitake, a Chinko, ou a revelações da campanha. Estes não existem até serem merecidos pela narrativa."],
  ["99",  "Chinko sorri",               "lendário",   "Kaitake escolhe conscientemente qualquer efeito da tabela. Chinko não interfere. Pela primeira e única vez, a Cartola é completamente dela. O dado não rola. A escolha é dela."],
  ["100", "Chinko e Kaitake",           "lendário",   "GM e jogadora criam juntos um efeito único, irrepetível, ligado ao momento exato da campanha. Acontece uma vez. Não está escrito em nenhum lugar. É deles."],
];

// ── DOCUMENT ─────────────────────────────────────────────────────────────────

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20, color: BLACK } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: PURPLE },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: DARK_GRAY },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children: [

      // TITLE
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "A Cartola de Kaitake", bold: true, font: "Arial", size: 52, color: PURPLE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "Item Único — Pathfinder 2e", font: "Arial", size: 24, color: DARK_GRAY, italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: PURPLE_L, space: 4 } },
        children: [new TextRun({ text: "Documento para o GM — Versão completa d100", font: "Arial", size: 20, color: DARK_GRAY })]
      }),

      spacer(120),

      // CONCEITO
      heading1("Conceito"),
      body("A Cartola é um item único que cresce com a Kaitake ao longo da campanha, evoluindo através de marcos narrativos, investimento em PO e progressão de nível. Seu espírito interno — Chinko — é um ser caótico e satisfeito com o próprio caos, que se comunica e evolui junto com a personagem."),
      spacer(60),
      body("O item funciona como um canal de Toon Force calibrada para uma campanha épica e tensa: o caos é real, mas nunca prejudicial para a Kaitake. Os efeitos vão do puramente utilitário ao absurdamente cômico, com espaço deliberado para o GM imprimir a identidade da campanha nos slots abertos."),

      spacer(120),

      // PROGRESSÃO
      heading1("Progressão"),
      body("A tabela cresce junto com o dado: de 1d4 no início até 1d100 no auge. Cada estágio requer uma combinação de nível, marco narrativo e investimento em PO — nenhum deles sozinho é suficiente."),
      spacer(80),

      stageBadge("Nv. 1–3 · Estado base", "1d4", "Cartola do Primeiro Truque", PURPLE, PURPLE_L, "1 carga/dia · Efeitos 1–4 · Chinko ainda está te avaliando"),
      spacer(40),
      stageBadge("50 PO · Nv. 3–5", "1d6", "Chinko aprova o investimento", AMBER, AMBER_L, "1 carga/dia · Efeitos 1–6"),
      spacer(40),
      stageBadge("Marco narrativo + PO · Nv. 5–8", "1d10", "A Cartola ri de você", BLUE, BLUE_L, "2 cargas/dia · Efeitos 1–10 · Toon Force começa aqui"),
      spacer(40),
      stageBadge("Nv. 9 + Marco + PO", "1d20", "Cartola desperta — Chinko fala", GREEN, GREEN_L, "3 cargas/dia · Efeitos 1–20 · Bulk 10 · Chinko: Empathy → Speech"),
      spacer(40),
      stageBadge("Nv. 12 + Marco épico + PO", "1d50", "Chinko ri junto com você", TEAL, TEAL_L, "4 cargas/dia · Efeitos 1–50 · Bulk 25 · 1 uso grátis/sessão · Bilhete preciso"),
      spacer(40),
      stageBadge("Nv. 15+ + Marco lendário + PO", "1d100", "Cartola plena — Chinko e Kaitake", RED, RED_L, "5 cargas/dia · Efeitos 1–100 · Bulk 50 · 2 usos grátis/sessão · Chinko Speech pleno"),

      spacer(80),
      italic("O d100 não é só um dado maior — é Chinko e Kaitake em sincronia total. Os efeitos 51–100 existem porque a relação delas chegou lá, não só porque o nível chegou."),

      spacer(120),

      // CHINKO
      heading1("Sobre Chinko"),
      body("Chinko é o espírito interno da Cartola. Ele não é maligno, não é neutro — ele é caótico-satisfeito. Gosta de confusão, aprecia improvisação, e parece ter uma opinião sobre tudo sem nunca expressá-la claramente."),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 7160],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: PURPLE, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Estágio", bold: true, font: "Arial", size: 18, color: WHITE })] })] }),
            new TableCell({ borders, width: { size: 7160, type: WidthType.DXA }, shading: { fill: PURPLE, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Comunicação de Chinko", bold: true, font: "Arial", size: 18, color: WHITE })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: GRAY_L, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "1d4 – 1d10", font: "Arial", size: 19, color: BLACK })] })] }),
            new TableCell({ borders, width: { size: 7160, type: WidthType.DXA }, shading: { fill: GRAY_L, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Silencioso. Transmite emoções leves — satisfação, curiosidade, tédio.", font: "Arial", size: 19, color: BLACK })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 2200, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "1d20", font: "Arial", size: 19, color: BLACK })] })] }),
            new TableCell({ borders, width: { size: 7160, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Empathy: transmite emoções claras e imagens simples. Começa a comentar efeitos internamente.", font: "Arial", size: 19, color: BLACK })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: GRAY_L, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "1d50 – 1d100", font: "Arial", size: 19, color: BLACK })] })] }),
            new TableCell({ borders, width: { size: 7160, type: WidthType.DXA }, shading: { fill: GRAY_L, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "Speech pleno. Chinko fala — com sotaque indeterminado, frases curtas e uma satisfação perturbadora com tudo que dá errado para os outros.", font: "Arial", size: 19, color: BLACK })] })] }),
          ]}),
        ]
      }),

      spacer(120),
      new Paragraph({ children: [new PageBreak()] }),

      // TABELA 1–20
      heading1("Tabela de Efeitos — 1 a 20"),
      body("Disponíveis desde o estágio base. A fundação da Cartola."),
      spacer(60),
      sectionTable(effects_1_20),

      spacer(120),
      new Paragraph({ children: [new PageBreak()] }),

      // TABELA 21–50
      heading1("Tabela de Efeitos — 21 a 50"),
      body("Desbloqueados no estágio 1d50. Toon Force intermediário — mais mecânico, mais situacional."),
      spacer(60),
      sectionTable(effects_21_50),

      spacer(120),
      new Paragraph({ children: [new PageBreak()] }),

      // TABELA 51–70
      heading1("Tabela de Efeitos — 51 a 70"),
      body("Desbloqueados no estágio 1d100. Efeitos mais poderosos e criativos — Chinko operando no auge."),
      spacer(60),
      sectionTable(effects_51_70),

      spacer(80),
      heading2("71–75 — Slots abertos (GM autoral)"),
      body("Estes 5 slots estão intencionalmente em branco. O GM deve preenchê-los com efeitos específicos da campanha — NPCs, locais, eventos recentes, ou revelações. Chinko conhece o mundo da Kaitake melhor do que parece."),

      spacer(120),
      new Paragraph({ children: [new PageBreak()] }),

      // TABELA 76–100
      heading1("Tabela de Efeitos — 76 a 100"),
      body("Os efeitos lendários. Poderosos, memoráveis, nenhum game-breaking. Com slots autorais e dois efeitos finais que pertencem à relação entre GM, jogadora e Chinko."),
      spacer(60),
      sectionTable(effects_76_90),

      spacer(80),
      heading2("91–98 — Slots autorais lendários"),
      body("Os 8 slots mais raros da tabela. Não devem ser preenchidos com antecedência — devem emergir de momentos da campanha. Quando Kaitake rolar um desses números, o GM tem a opção de deixar em aberto até a história ditar o que pertence ali."),

      spacer(60),
      sectionTable(effects_91_100),

      spacer(120),
      new Paragraph({ children: [new PageBreak()] }),

      // NOTAS PARA O GM
      heading1("Notas para o GM"),

      heading2("Sobre os slots abertos"),
      body("Os 16 slots abertos (71–75, 81–85, 91–98) não são lacunas — são intenção de design. A Cartola pertence a essa campanha, não a uma tabela genérica. Cada slot que o GM preenche é um momento em que Chinko 'conhece' a história de Kaitake."),

      spacer(60),
      heading2("Sobre o teto de poder"),
      body("Nenhum efeito desta tabela foi projetado para resolver sozinho um encontro ou uma situação narrativa. Os efeitos lendários (76–100) são memoráveis e impactantes, mas sempre deixam o encontro em aberto — eles dão fôlego, criam oportunidade, abrem espaço. Nunca encerram."),

      spacer(60),
      heading2("Sobre os efeitos 99 e 100"),
      body("O efeito 99 (Chinko sorri) é o único momento em que a Cartola é completamente da Kaitake — sem aleatoriedade, sem Chinko interferindo. É um presente narrativo que deve ser raro e sentido."),
      spacer(40),
      body("O efeito 100 (Chinko e Kaitake) não pode ser preparado. Quando acontecer, GM e jogadora criam juntos algo irrepetível ligado àquele momento exato. Este efeito existe uma vez. Não está escrito em nenhum lugar. É deles."),

      spacer(60),
      heading2("Uso em mesa"),
      body("Ação de uso recomendada: 1 Ação (permitir reação tática) ou 2 Ações (dar peso à decisão). O dado deve ser rolado abertamente — o caos é parte da experiência. Resultados acima do estágio atual da Cartola podem ser tratados como: 'Chinko sorri, mas o efeito ainda está adormecido' — sem gasto de carga."),

      spacer(120),

      // RODAPÉ
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: GRAY_M, space: 8 } },
        spacing: { before: 120, after: 40 },
        children: [new TextRun({ text: "Criado em colaboração com Claude · Pathfinder 2e · Documento para uso exclusivo de mesa", font: "Arial", size: 16, color: DARK_GRAY, italics: true })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/cartola_kaitake.docx', buffer);
  console.log('Done');
});
