import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-purple-700 text-white px-5 py-3 rounded-xl hover:bg-purple-800 transition ${props.className || ''}`}
    />
  );
}