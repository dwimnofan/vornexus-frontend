import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Our App</h1>
          <p className="mt-2 text-gray-600">Please login or register to continue</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/register">Register</Link>
          </Button>
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}