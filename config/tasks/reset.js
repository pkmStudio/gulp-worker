import { deleteAsync } from "del";

// Очистка папки `dist/` перед сборкой
export const reset = () => deleteAsync(app.paths.clean);