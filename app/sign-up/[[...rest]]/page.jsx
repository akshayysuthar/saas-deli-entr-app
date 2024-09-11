// app/login/page.jsx
import { SignUp } from '@clerk/nextjs';


export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <SignUp />
      </div>
    </div>
  );
}
