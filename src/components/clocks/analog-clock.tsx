import { useEffect, useState } from "react";

export default function AnalogClock() {
    const radius = 120;
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Ângulos de rotação
    const hourAngle = (hours + minutes / 60) * 30; // 360° / 12h = 30° por hora
    const minuteAngle = (minutes + seconds / 60) * 6; // 360° / 60 = 6° por min
    const secondAngle = seconds * 6;

    return (
        <div className="relative w-[300px] h-[300px] rounded-full border-4 border-gray-800 mx-auto flex items-center justify-center bg-white">
            {/* Números */}
            {numbers.map((num) => {
                const angle = ((num - 3) / 12) * 2 * Math.PI;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                    <div
                        key={num}
                        className="absolute text-xl font-semibold text-gray-800 select-none"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                        {num}
                    </div>
                );
            })}

            {/* Centro */}
            <div className="absolute w-4 h-4 bg-gray-800 rounded-full z-20" />

            {/* Ponteiro das horas */}
            <div
                className="absolute bottom-1/2 left-1/2 w-1.5 h-[70px] bg-gray-800 rounded-full origin-bottom z-10"
                style={{ transform: `translate(-50%, 0) rotate(${hourAngle}deg)` }}
            />

            {/* Ponteiro dos minutos */}
            <div
                className="absolute bottom-1/2 left-1/2 w-1 h-[100px] bg-gray-600 rounded-full origin-bottom z-10"
                style={{ transform: `translate(-50%, 0) rotate(${minuteAngle}deg)` }}
            />

            {/* Ponteiro dos segundos */}
            <div
                className="absolute bottom-1/2 left-1/2 w-0.5 h-[110px] bg-red-500 rounded-full origin-bottom z-10"
                style={{ transform: `translate(-50%, 0) rotate(${secondAngle}deg)` }}
            />
        </div>
    );
}
