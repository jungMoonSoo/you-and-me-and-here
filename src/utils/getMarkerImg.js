import SpoonMarker from "../assets/svg/placeMarker/SpoonMarker.svg";
import CoffeeMarker from "../assets/svg/placeMarker/CoffeeMarker.svg";
import BilliardsMarker from "../assets/svg/placeMarker/BilliardsMarker.svg";
import BedMarker from "../assets/svg/placeMarker/BedMarker.svg";
import GameMarker from "../assets/svg/placeMarker/GameMarker.svg";
import BoardGameMarker from "../assets/svg/placeMarker/BoardGameMarker.svg";
import UndefinedMarker from "../assets/svg/placeMarker/UndefinedMarker.svg";
import MicMarker from "../assets/svg/placeMarker/MicMarker.svg";
import PingPongMarker from "../assets/svg/placeMarker/PingPongMarker.svg";
import BowlingMarker from "../assets/svg/placeMarker/BowlingMarker.svg";
import BlueMarker from "../assets/svg/personMarker/BlueMarker.svg";
import PinkMarker from "../assets/svg/personMarker/PinkMarker.svg";
import OrangeMarker from "../assets/svg/personMarker/OrangeMarker.svg";
import GreenMarker from "../assets/svg/personMarker/GreenMarker.svg";

export function getPlaceMarkerImg(category) {
    if (category.includes("보드카페")) {
        return BoardGameMarker;
    } else if (category.includes("카페")) {
        return CoffeeMarker;
    } else if (category.includes("숙박")) {
        return BedMarker;
    } else if (category.includes("당구")) {
        return BilliardsMarker;
    } else if (category.includes("PC방")) {
        return GameMarker;
    } else if (category.includes("탁구")) {
        return PingPongMarker;
    } else if (category.includes("볼링")) {
        return BowlingMarker;
    } else if (category.includes("노래방")) {
        return MicMarker;
    } else if (category.includes("음식점")) {
        return SpoonMarker;
    } else {
        return UndefinedMarker;
    }
}

export function randomMarkerImg(imgNum) {
    switch (imgNum % 4) {
        case 0:
            return OrangeMarker;
        case 1:
            return PinkMarker;
        case 2:
            return BlueMarker;
        case 3:
            return GreenMarker;
        default:
            return OrangeMarker;
    }
}
