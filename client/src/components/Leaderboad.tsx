import { useEffect, useState } from 'react';

type OptionKeys = 'A' | 'B' | 'C' | 'D';

const Leaderboard = ({ data }:{data: {
    A: number,
    B: number,
    C: number,
    D: number,
    totalUser: number,
    ans: string
}}) => {
    const finalPercentages = {
        A: Math.floor((data?.A / data?.totalUser) * 100) || 0,
        B: Math.floor((data?.B / data?.totalUser) * 100) || 0,
        C: Math.floor((data?.C / data?.totalUser) * 100) || 0,
        D: Math.floor((data?.D / data?.totalUser) * 100) || 0
    };

    const [animatedPercentages, setAnimatedPercentages] = useState({
        A: 0,
        B: 0,
        C: 0,
        D: 0,
    });

    const userSelection = [
        { val: data?.A, id: 'A' },
        { val: data?.B, id: 'B' },
        { val: data?.C, id: 'C' },
        { val: data?.D, id: 'D' }
    ];

    useEffect(() => {
     
        const timer = setTimeout(() => {
            setAnimatedPercentages(finalPercentages);
        }, 100);

        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 mb-10  bg-gray-100 font-inter text-white">
            <div className="bg-gray-800 p-8 px-14 rounded-3xl md:mr-[615px]  shadow-md mx-auto  w-full md:w-[500px] md:max-2xl text-center border border-gray-700">
                <h1 className="text-3xl font-extrabold text-blue-400 mb-6 tracking-wide">
                    Leaderboard 
                </h1>

                <div className="flex flex-row justify-between items-end md:w-[400px] gap-4 h-64 mb-6 md:h-80">
                    {userSelection.map((value) => {
                        // Use the animated percentages from state to control bar height.
                        const heightPercentage = animatedPercentages[value.id as OptionKeys];

                        return (
                            <div
                                key={value.id}
                                className="flex flex-col items-center justify-end w-1/4 h-full transform transition-transform duration-300 hover:scale-105"
                            >
                                <div className="mb-2 text-sm font-bold text-gray-200">
                                    {value.val} <span className="text-sm">user</span>
                                </div>
                                <div
                                    className={`w-2/3 md:w-1/2 ${value.id === data?.ans ? "bg-green-500 z-50": "bg-red-500 opacity-80"} rounded-t-lg transition-all duration-1000 ease-out shadow-lg`}
                                    style={{ height: `${heightPercentage}%` }}
                                ></div>
                                <div className={`text-xs md:text-sm ${value.id === data?.ans ? "text-green-400": "text-gray-400"}  font-semibold mt-2`}>
                                    Option {value.id}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;

