export interface icon {
    "key": string;
    "code": number;
    "day": string;
    "night": string;
}

export const CONDITIONS: icon[] = [
    {
        "code": 0,
        "key": "clear",
        "day": "clear-day.svg",
        "night": "clear-night.svg"
    },
    {
        "code": 1,
        "key": "partly sunny",
        "day": "cloudy-1-day.svg",
        "night": "cloudy-1-night.svg"
    },
    {
        "code": 2,
        "key": "partly cloudy",
        "day": "cloudy-2-day.svg",
        "night": "cloudy-2-night.svg"
    },
    {
        "code": 3,
        "key": "overcast",
        "day": "cloudy-3-day.svg",
        "night": "cloudy-3-night.svg"
    },
    {
        "code": 45,
        "key": "fog",
        "day": "fog-day.svg",
        "night": "fog-night.svg"
    },
    {
        "code": 48,
        "key": "depositing rime fog",
        "day": "fog-day.svg",
        "night": "fog-night.svg"
    },
    {
        "code": 51,
        "key": "light intensity drizzle",
        "day": "rainy-1-day.svg",
        "night": "rainy-1-night.svg"
    },
    {
        "code": 53,
        "key": "drizzle",
        "day": "rainy-2-day.svg",
        "night": "rainy-2-night.svg"
    },
    {
        "code": 55,
        "key": "heavy intensity drizzle",
        "day": "rainy-3-day.svg",
        "night": "rainy-3-night.svg"
    },
    {
        "code": 56,
        "key": "freezing drizzle",
        "day": "rainy-3.svg",
        "night": "rainy-3.svg"
    },
    {
        "code": 57,
        "key": "freezing drizzle",
        "day": "rainy-3.svg",
        "night": "rainy-3.svg"
    },
    {
        "code": 61,
        "key": "light intensity drizzle",
        "day": "rainy-1-day.svg",
        "night": "rainy-1-night.svg"
    },
    {
        "code": 63,
        "key": "drizzle",
        "day": "rainy-2-day.svg",
        "night": "rainy-2-night.svg"
    },
    {
        "code": 65,
        "key": "heavy intensity drizzle",
        "day": "rainy-3-day.svg",
        "night": "rainy-3-night.svg"
    },
    {
        "code": 66,
        "key": "freezing rain",
        "day": "rainy-3-day.svg",
        "night": "rainy-3-night.svg"
    },
    {
        "code": 67,
        "key": "heavy freezing rain",
        "day": "rainy-3-day.svg",
        "night": "rainy-3-night.svg"
    },
    {
        "code": 71,
        "key": "light snow",
        "day": "snowy-1-day.svg",
        "night": "snowy-1-night.svg"
    },
    {
        "code": 73,
        "key": "snow",
        "day": "snowy-2-day.svg",
        "night": "snowy-2-night.svg"
    },
    {
        "code": 75,
        "key": "heavy snow",
        "day": "snowy-3-day.svg",
        "night": "snowy-3-night.svg"
    },
    {
        "code": 77,
        "key": "snow grains",
        "day": "snowy-3-day.svg",
        "night": "snowy-3-night.svg"
    },
    {
        "code": 80,
        "key": "light intensity shower rain",
        "day": "snowy-1-day.svg",
        "night": "snowy-1-night.svg"
    },
    {
        "code": 81,
        "key": "shower rain",
        "day": "snowy-2-day.svg",
        "night": "snowy-2-night.svg"
    },
    {
        "code": 82,
        "key": "heavy intensity shower rain",
        "day": "snowy-3-day.svg",
        "night": "snowy-3-night.svg"
    },
    {
        "code": 85,
        "key": "light snow showers",
        "day": "snowy-2-day.svg",
        "night": "snowy-2-night.svg"
    },
    {
        "code": 86,
        "key": "moderate or heavy snow showers",
        "day": "snowy-3-day.svg",
        "night": "snowy-3-night.svg"
    },
    {
        "code": 95,
        "key": "thunderstorm",
        "day": "thunderstorm-1-day.svg",
        "night": "thunderstorm-1-night.svg"
    },
    {
        "code": 96,
        "key": "thunderstorm with light hail",
        "day": "thunderstorm-2-day.svg",
        "night": "thunderstorm-2-night.svg"
    },
    {
        "code": 99,
        "key": "thunderstorm with heavy hail",
        "day": "thunderstorm-3-day.svg",
        "night": "thunderstorm-3-night.svg"
    }
]

export const NOT_AVAILABLE: icon = {
    "key": "not available",
    "code": -1,
    "day": "na.svg",
    "night": "na.svg"
}

export const get_icon = (code: number): icon => {
    for (let i = 0; i < CONDITIONS.length; i++){
        if (CONDITIONS[i].code === code){
            console.log(CONDITIONS[i]);
            return CONDITIONS[i];
        }
    }
    console.log(NOT_AVAILABLE);
    return NOT_AVAILABLE;
}
