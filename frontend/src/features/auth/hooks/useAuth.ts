import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function login({ email, password } : { email: string , password: string}){
    const res = await apiClient.post('/auth/login', { email, password });
   
    return res.data;
}

async function register({ email, password, name } : { email: string , password: string, name: string}){
    const res = await apiClient.post('/auth/register', { email, password, name });
    return res.data;
}

export default function useAuth(){
    const router = useRouter();


    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            router.push("/invoices")
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            toast.error(errorMessage);
        }
    })

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            router.push("/invoices")
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed";
            toast.error(errorMessage);
        }
    })
    return {
        login : loginMutation.mutate,
        loginPending: loginMutation.isPending,
        loginError: loginMutation.error,
        register : registerMutation.mutate,
        registerPending: registerMutation.isPending,
        registerError: registerMutation.error
    }
}