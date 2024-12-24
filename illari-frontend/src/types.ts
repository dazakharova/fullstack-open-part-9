enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}

interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export default DiaryEntry;