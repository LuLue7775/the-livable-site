import { providers, signIn } from "next-auth/client";
export default function SignIn({ providers }) {
  return (
    <>
    <div> discover from the subtle</div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
export async function getServerSideProps(context) {
  return { props: { providers: await providers() } };
}