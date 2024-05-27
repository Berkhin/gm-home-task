export type Region = {
    id: number;
    label: string;
    points: number[]
}

export type Photo = {
    id: number | string;
    image: string;
    regions: Region[] | string;
}

export type Image = {
    id: string;
    image: string;
    regions: string;
}