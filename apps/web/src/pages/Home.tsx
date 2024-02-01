const Home = () => {
  const token = window.localStorage.getItem("token");
  return (
    <div className="h-screen w-screen ">
      <div className="mt-2">{token}</div>
    </div>
  );
};

export default Home;
