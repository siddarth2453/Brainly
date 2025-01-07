import CloseIcon from "../icons/CloseIcon";
import InputBox from "./InputBox";
import Button from "./Button";

interface ModalProps {
    value: boolean;
    onClickFn: () => void;
}

const Modal = (props: ModalProps) => {
    return (
        <div
            className={`h-full w-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center ${
                props.value ? " " : " hidden "
            }`}
        >
            <div className="w-80 h-96 md:w-96 bg-secondary rounded-lg">
                <div className="h-14 flex justify-end p-3">
                    <div className="cursor-pointer" onClick={props.onClickFn}>
                    < CloseIcon/>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-4">
                    <InputBox placeholder="Enter your Title"/>
                    <InputBox placeholder="Enter Link"/>
                    <div><label htmlFor="type">Type:</label>
                    <select className="py-2 px-3 mx-2 rounded-lg" name="type" id="type">
                        <option  value="youtube">Youtube</option>
                        <option  value="youtube">Tweet</option>

                    </select></div>
                    <Button text="Submit" variant="primary" size="md"/>
                </div>
            </div>
        </div>
    );
};

export default Modal;
