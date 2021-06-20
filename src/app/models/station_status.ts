export interface StationStatus {
    station_id: number;
    is_installed: boolean;
    is_renting: boolean;
    num_bikes_available: number;
    num_docks_available: number;
    last_reported: number;
    is_returning: boolean;
}