import { useState, useRef, useEffect } from "react";
import { Check, Crown, Zap, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FormatOption {
  name: string;
  price: string;
  icon: React.ReactNode;
  features: string[];
  bulkDeal?: string;
  popular?: boolean;
}

const formatOptions: FormatOption[] = [
  {
    name: "Бар / Вечеринка",
    price: "от 5 000 ₽",
    icon: <Star className="w-6 h-6" />,
    features: [
      "Выступление 1–1,5 часа",
      "Живой вокал с автотюном",
      "10–15 каверов по запросу",
      "Своё оборудование",
      "Интерактив с публикой",
    ],
    bulkDeal: "ЗАКАЖИ 2 ВЕЧЕРА — ПОЛУЧИ СКИДКУ 15%!",
  },
  {
    name: "Корпоратив",
    price: "от 15 000 ₽",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Выступление 2–3 часа",
      "Программа под ваш стиль",
      "Живой вокал с автотюном",
      "До 25 каверов",
      "Своё оборудование",
      "Репетиция по запросу",
    ],
    popular: true,
  },
  {
    name: "Частное мероприятие",
    price: "от 10 000 ₽",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "День рождения, свадьба, юбилей",
      "Выступление 1,5–2 часа",
      "Живой вокал с автотюном",
      "Сет-лист под заказ",
      "Своё оборудование",
    ],
  },
  {
    name: "Онлайн / Стрим",
    price: "от 3 000 ₽",
    icon: <Globe className="w-6 h-6" />,
    features: [
      "Живое выступление онлайн",
      "Стрим на вашей платформе",
      "Вокал с автотюном в эфире",
      "Интерактив с аудиторией",
      "Запись по договорённости",
      "Любой жанр и стиль",
    ],
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="licenses" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Форматы выступлений</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Выбери подходящий формат — выступлю на любом мероприятии с живым вокалом и автотюном
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {formatOptions.map((option, index) => (
            <div
              key={option.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-white/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Популярный
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-white/10 mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{option.name}</h3>
                    <div className="text-3xl font-bold text-white">{option.price}</div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3 mb-6">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-white mr-2 shrink-0 mt-0.5" />
                          <span className="text-sm text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {option.bulkDeal && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white bg-white/5 py-2 px-3 rounded-lg border border-white/10 animate-pulse">
                        {option.bulkDeal}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
                    asChild
                  >
                    <a href="#contact">
                      Заказать
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
