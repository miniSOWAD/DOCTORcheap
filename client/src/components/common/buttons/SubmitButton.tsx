export default function SubmitButton({ loading, text }: { loading?: boolean; text: string }) {
  return (
    <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800">
      {loading ? 'Please wait...' : text}
    </button>
  );
}