import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Button from "./Button";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/posts', { body });
            toast.success("Tweeted");
            mutatePosts();
            setBody('');
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts]);
    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (<div>

            </div>) : (
                <div className="py-8">
                    <h1 className="text-white text-center text-2xl font-bold mb-4">Welcome to Twitter</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button label="Login" onClick={loginModal.onOpen} />
                        <Button label="Register" onClick={registerModal.onOpen} secondary />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form