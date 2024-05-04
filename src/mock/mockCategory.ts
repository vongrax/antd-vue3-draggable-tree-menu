export const categoriesMock = [
  {
    _id: (Math.random() * 43545).toString(),
    title: "Каталог",
    status: true,
    count: 20,
    children: [
      {
        _id: (Math.random() * 3324).toString(),
        title: "Новинки",
        status: true,
        count: 10,
        children: [],
      },
      {
        _id: (Math.random() * 4234).toString(),
        title: "Хиты продаж",
        status: true,
        count: 16,
        children: [],
      },
      {
        _id: (Math.random() * 34324).toString(),
        title: "Акции",
        status: true,
        count: 5,
        children: [],
      },
    ],
  },
  {
    _id: (Math.random() * 33324).toString(),
    title: "Верхняя одежда",
    status: true,
    count: 29,
    children: [
      {
        _id: (Math.random() * 345353).toString(),
        title: "Одежда",
        status: true,
        count: 2,
        children: [],
      },
    ],
  },
  {
    _id: (Math.random() * 345324353).toString(),
    title: "Куртки",
    status: true,
    count: 20,
    children: [
      {
        _id: (Math.random() * 767).toString(),
        title: "Ветровки",
        status: true,
        count: 2,
        children: [],
      },
    ],
  },
  {
    _id: (Math.random() * 34533).toString(),
    title: "Обувь",
    status: false,
    count: 20,
    children: [],
  },
];

export type CategoryType = typeof categoriesMock;
