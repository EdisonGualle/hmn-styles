import Form from "./components/Form"
import ListView from "./components/ListView";

const Page = () => {
    return (
        <div className="p-5  flex flex-col md:flex-row gap-5">
            <Form />
            <ListView/>
        </div>
    );
}

export default Page 