import Diagram from "./components/Diagram";

const App: React.FC = () => {
  return (
    <main>
      <div className="container mx-auto px-6 mt-6">
        <h1 className="font-semibold text-2xl leading-loose">
          نمودار شرکت
          <span className="text-[#488dd2] font-bold text-3xl"> ریرا </span>
          <br />
          به همراه دپارتمان های مجموعه ما
        </h1>
      </div>

      <Diagram />
    </main>
  );
};

export default App;
