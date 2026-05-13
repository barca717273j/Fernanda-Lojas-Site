import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '7',
    name: 'Essência do amor',
    tagline: '✔ 4.583 vendidos',
    description: 'Um anel delicado, com brilho encantador e acabamento impecável. O presente ideal para marcar um momento inesquecível no Dia dos Namorados.',
    originalPrice: 179.90,
    promoPrice: 129.90,
    images: ['https://i.ibb.co/TBRVmpST/banner.jpg'],
    stock: 19,
    isSoldOut: false,
    soldCount: 4583,
    rating: 5,
    reviews: [
      { name: 'Cláudia Ramos', comment: 'Lindo e muito delicado, amei!', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/b5eyk6n_883373'
  },
  {
    id: '8',
    name: 'Amor verdadeiro',
    tagline: '✔ 4.742 vendidos',
    description: 'O queridinho dos casais apaixonados. Um símbolo simples, bonito e cheio de significado para celebrar o amor.',
    originalPrice: 199.90,
    promoPrice: 149.90,
    images: ['https://i.ibb.co/5X7VdG5G/banner.jpg'],
    stock: 27,
    isSoldOut: false,
    soldCount: 4742,
    rating: 5,
    reviews: [
      { name: 'Marcos Vigário', comment: 'Perfeito para o presente que eu queria.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/6k6p3ed_883377',
    isBestSeller: true
  },
  {
    id: '1',
    name: 'Caixinha do amor',
    tagline: '✔ 4.327 vendidos',
    description: 'Minimalista e delicado, ideal para quem valoriza a simplicidade do sentimento. Design exclusivo em Prata 925.',
    originalPrice: 249.90,
    promoPrice: 97.90,
    images: ['https://i.ibb.co/WWvQFnhw/anel1.jpg'],
    stock: 23,
    isSoldOut: false,
    soldCount: 4327,
    rating: 5,
    reviews: [
      { name: 'Ana Silva', comment: 'Chegou perfeito, minha namorada amou!', rating: 5 },
      { name: 'Lucas M.', comment: 'Acabamento impecável.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/5sfudpf_882473'
  },
  {
    id: '2',
    name: 'Rosa do amor',
    tagline: '✔ 4.891 vendidos',
    description: 'O MAIS VENDIDO. Design clássico que celebra grandes promessas com pequenos anéis. Perfeito para pedidos.',
    originalPrice: 299.90,
    promoPrice: 129.90,
    images: ['https://i.ibb.co/xSYQyp1R/anel2.jpg'],
    stock: 34,
    isSoldOut: false,
    soldCount: 4891,
    rating: 5,
    reviews: [
      { name: 'Ricardo Santos', comment: 'Qualidade impressionante, muito bem embalado.', rating: 5 },
      { name: 'Fernanda G.', comment: 'Lindo demais, amei cada detalhe.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/nxfo66t_882485'
  },
  {
    id: '3',
    name: 'Essência do amor',
    tagline: '✔ 4.502 vendidos',
    description: 'Para quem ama de verdade e deseja eternizar cada sorriso compartilhado. Cravejado com zircônias premium.',
    originalPrice: 459.90,
    promoPrice: 197.00,
    images: ['https://i.ibb.co/tMg0H2Jj/anel3.jpg'],
    stock: 12,
    isSoldOut: false,
    soldCount: 4502,
    rating: 5,
    reviews: [
      { name: 'Juliana Costa', comment: 'Parece joia de joalheria cara.', rating: 5 },
      { name: 'Paulo R.', comment: 'Surpreendi minha noiva, ela adorou.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/c4xbw39_882488'
  },
  {
    id: '4',
    name: 'Destino a dois',
    tagline: '✔ 4.768 vendidos',
    description: 'Simplicidade e beleza em uma joia feita para durar tanto quanto o seu amor. Resistente e atemporal.',
    originalPrice: 389.90,
    promoPrice: 159.90,
    images: ['https://i.ibb.co/DP8zkPKK/anel4.jpg'],
    stock: 18,
    isSoldOut: false,
    soldCount: 4768,
    rating: 5,
    reviews: [
      { name: 'Marcos Oliveira', comment: 'Muito bonito e delicado. Recomendo!', rating: 5 },
      { name: 'Carla S.', comment: 'Tamanho serviu certinho, guia de medidas ajudou.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/3c5vqqf_882499'
  },
  {
    id: '5',
    name: 'Coração dourado',
    tagline: '✔ 4.615 vendidos',
    description: 'Um toque de brilho sutil para quem não precisa de luxo para ser feliz. Elegância em cada detalhe.',
    originalPrice: 229.90,
    promoPrice: 89.90,
    images: ['https://i.ibb.co/j1n65XL/anel5.jpg'],
    stock: 27,
    isSoldOut: false,
    soldCount: 4615,
    rating: 5,
    reviews: [
      { name: 'Beatriz Lima', comment: 'Entrega rápida e produto excelente.', rating: 5 },
      { name: 'Henrique J.', comment: 'Ótimo custo benefício.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/5k6uj5v_882502'
  },
  {
    id: '6',
    name: 'Promessa do coração',
    tagline: '✔ 4.954 vendidos',
    description: 'O acabamento perfeito para simbolizar a união de duas almas que se encontraram. Sublime e único.',
    originalPrice: 349.90,
    promoPrice: 149.90,
    images: ['https://i.ibb.co/DDhMxj0D/anel6.jpg'],
    stock: 21,
    isSoldOut: false,
    soldCount: 4954,
    rating: 5,
    reviews: [
      { name: 'Gabriel Ferreira', comment: 'Superou minhas expectativas! Muito brilhante.', rating: 5 },
      { name: 'Tatiana P.', comment: 'Melhor presente de namoro.', rating: 5 }
    ],
    checkoutUrl: 'https://pay.cakto.com.br/f7wxo7b_882507'
  },
  // Mais produtos indisponíveis com blur
  {
    id: `un-1`,
    name: `Coleção Premium 7`,
    tagline: 'Indisponível no momento',
    description: 'Esta peça exclusiva está temporariamente fora de estoque devido à altíssima demanda do Dia dos Namorados.',
    originalPrice: 299.90,
    promoPrice: 0,
    images: ['https://i.ibb.co/WWvQFnhw/anel1.jpg'],
    stock: 0,
    isSoldOut: true,
    soldCount: 1540,
    rating: 5,
    reviews: []
  },
  {
    id: `un-2`,
    name: `Coleção Premium 8`,
    tagline: 'Indisponível no momento',
    description: 'Esta peça exclusiva está temporariamente fora de estoque devido à altíssima demanda do Dia dos Namorados.',
    originalPrice: 359.90,
    promoPrice: 0,
    images: ['https://i.ibb.co/xSYQyp1R/anel2.jpg'],
    stock: 0,
    isSoldOut: true,
    soldCount: 1820,
    rating: 5,
    reviews: []
  },
  {
    id: `un-3`,
    name: `Coleção Premium 9`,
    tagline: 'Indisponível no momento',
    description: 'Esta peça exclusiva está temporariamente fora de estoque devido à altíssima demanda do Dia dos Namorados.',
    originalPrice: 429.90,
    promoPrice: 0,
    images: ['https://i.ibb.co/tMg0H2Jj/anel3.jpg'],
    stock: 0,
    isSoldOut: true,
    soldCount: 2100,
    rating: 5,
    reviews: []
  },
  {
    id: `un-4`,
    name: `Coleção Premium 10`,
    tagline: 'Indisponível no momento',
    description: 'Esta peça exclusiva está temporariamente fora de estoque devido à altíssima demanda do Dia dos Namorados.',
    originalPrice: 389.90,
    promoPrice: 0,
    images: ['https://i.ibb.co/DP8zkPKK/anel4.jpg'],
    stock: 0,
    isSoldOut: true,
    soldCount: 1950,
    rating: 5,
    reviews: []
  }
];

export const SIZES = Array.from({ length: 21 }).map((_, i) => (i + 10).toString());

