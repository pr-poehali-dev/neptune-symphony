import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const achievements = [
  { icon: <Icon name="Mic2" size={24} />, label: "Лет на сцене", value: "7+" },
  { icon: <Icon name="Music2" size={24} />, label: "Исполненных каверов", value: "500+" },
  { icon: <Icon name="Users" size={24} />, label: "Выступлений", value: "300+" },
  { icon: <Icon name="Heart" size={24} />, label: "Городов", value: "15+" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `translateY(${(1 - scrollProgress) * 50}px)` }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-3xl transform -rotate-6"></div>
            <div className="w-full aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl relative z-10 overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/c0168bd1-c9ad-409f-9b15-97f5c9c5d255/bucket/5ffcd411-c66b-43cf-8649-910534be263c.jpg"
                alt="Диана — вокалист"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Привет, я Диана</h2>
            <p className="text-lg mb-6 text-zinc-300">
              Я — вокалист с 7-летним опытом живых выступлений. Пою каверы на популярные хиты
              с обработкой автотюна: создаю атмосферу, которая заставляет двигаться и подпевать.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              Работаю на корпоративах, вечеринках, барах и частных мероприятиях. Мой формат —
              живой вокал + автотюн + интерактив с публикой. Каждый гость уходит с улыбкой.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className={`bg-zinc-900/50 rounded-lg p-4 border border-white/10 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">{achievement.icon}</div>
                    <div className="text-2xl font-bold text-white">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;