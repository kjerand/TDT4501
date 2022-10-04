const Button = ({ text, onChange }: { text: string; onChange: Function }) => {
  return (
    <button
      onClick={() => onChange}
      className={`block uppercase mx-auto shadow bg-gray-700 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white text-md py-3 px-10 rounded`}
    >
      {text}
    </button>
  );
};
export default Button;
