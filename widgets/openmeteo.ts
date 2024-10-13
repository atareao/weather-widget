import Soup from 'gi://Soup';
import Gio from 'gi://Gio';

interface Params {
    latitude: string;
    longitude: string;
    current: string;
    temperature_unit: string;
    wind_speed_unit: string;
    precipitation_unit: string;
}

interface CurrentUnits{
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    cloud_cover: string;
    pressure_msl: string;
    surface_pressure: string;
}

interface Current{
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
}

interface WeatherResponse{
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: CurrentUnits;
    current: Current;
}


export default class OpenMeteo {
    private baseUrl = "https://api.open-meteo.com/v1/forecast";
    private currentData = "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure";
    private params: Params;
    private data: any;
    constructor(latitude: string, longitude: string, temperature_unit: string,
                win_speed_unit: string, precipitation_unit: string){
        this.params = {
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            current: this.currentData,
            temperature_unit: temperature_unit,
            wind_speed_unit: win_speed_unit,
            precipitation_unit: precipitation_unit,
        };
        this.data = null;
    }

    set latitude(value: string){
        this.params.latitude = value;
    }
    set longitude(value: string){
        this.params.longitude = value;
    }
    set temperature_unit(value: string){
        this.params.temperature_unit = value;
    }
    set wind_speed_unit(value: string){
        this.params.wind_speed_unit = value;
    }
    set precipitation_unit(value: string){
        this.params.precipitation_unit = value;
    }

    update(){
        try{
            const session = new Soup.Session();

            const message = Soup.Message.new_from_encoded_form(
                'GET',
                this.baseUrl,
                Soup.form_encode_hash(this.params)
            );
            const bytes = session.send_and_read(message, Gio.Cancellable.new());
            if(bytes != null){
                const response = (new TextDecoder())
                    .decode(bytes.get_data()?.buffer);
                console.log("Response: ", response);
                this.data = JSON.parse(response);
            }
        }catch(e){
            console.error("Error: ", e);
        }
    }

    get_data(): WeatherResponse{
        if (this.data == null){
            this.update();
        }
        return this.data;
    }

    get_temperature(): number{
        const data = this.get_data();
        return data.current.temperature_2m;
    }

    get_relative_humidity(): number{
        const data = this.get_data();
        return data.current.relative_humidity_2m;
    }
    get_weather_code(): number{
        const data = this.get_data();
        return data.current.weather_code;
    }

}
