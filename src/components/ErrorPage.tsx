interface ErrorPageProps {
  message: string;
}

function ErrorPage(props: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#fcfaf4] text-gray-800 text-center">
      <h1 className="text-6xl font-bold">404 Error</h1>
      <p className="text-xl mt-2">{props.message}</p>
    </div>
  );
}

export default ErrorPage;
