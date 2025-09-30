import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/forma" />
    </div>
  );
}
