import DaumPostcode from "react-daum-postcode";

export default function AddressPage() {
    return (
        <DaumPostcode
            onComplete={(data) => {
                localStorage.setItem("address", data.address);
                window.close();
            }}
        />
    );
}
