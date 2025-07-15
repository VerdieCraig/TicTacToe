import Image from "next/image";
import TicTacToeBoard from './TicTacToeBoard';

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <h1>Tic-Tac-Toe</h1>
      <TicTacToeBoard />
    </main>
  );
}
