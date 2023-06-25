"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Произошла ошибка приложения!</h2>
      <button onClick={() => reset()}>Нажмите чтобы перезагрузить данные</button>
    </div>
  );
}
