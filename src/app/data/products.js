function createSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-آ-ی]+/g, "")
      .replace(/\-\-+/g, "-");
  }
  
  const products = [
    {
      id: 1,
      title: "فرش ماشینی ماهیصبا طرح آترینا زمینه آبی",
      slug: createSlug("فرش ماشینی ماهیصبا طرح آترینا زمینه آبی"),
      category: "فرش ماشینی",
      size: "شش متری (200×300)",
      price: 13850000,
      seller: {
        name: "شرکت فرش سهند",
        performance: "عالی",
        rating: 4.6
      },
      features: {
        "رنگ زمینه": "آبی",
        "جنس نخ پود": "پلی استر و پنبه",
        "جنس نخ خاب": "اکریلیک هیت ست شده",
        "کیفیت فرش": "درجه یک",
        "شکل": "مستطیل",
        "جنس نخ تار": "پلی استر و پنبه"
      },
      images: [
        "/images/carpet-main.jpg",
        "/images/carpet-thumb1.jpg",
        "/images/carpet-thumb2.jpg",
        "/images/carpet-thumb3.jpg"
      ]
    }
  ];
  
  export default products;
  