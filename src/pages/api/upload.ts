import { NextApiRequestWithUserId } from "@/types";
import authGuard from "@/utils/authGuard";
import prisma from "@/utils/prisma";
import multer from "multer";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";

// создаем обработчик файлов
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/avatars",
    // названием файла является идентификатор пользователя + расширение исходного файла
    // это будет реализовано на клиенте
    filename: (_, file, cb) => cb(null, file.originalname),
  }),
});

// создаем роут
const uploadHandler = nextConnect<
  NextApiRequestWithUserId & { file?: Express.Multer.File },
  NextApiResponse
>();

uploadHandler.use(upload.single("avatar"));

// обрабатываем POST-запрос
uploadHandler.post(async (req, res) => {
  // multer сохраняет файл в директории `public/avatars`
  // и записывает данные файла в объект `req.file`
  if (!req.file) {
    return res.status(500).json({ message: "File write error" });
  }

  try {
    const user = await prisma.user.update({
      // идентификатор пользователя хранится в объекте запроса
      // после обработки запроса посредником `authGuard`
      where: { id: req.userId },
      data: {
        avatarUrl: req.file.path.replace("public", ""),
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        email: true,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "User update error" });
  }
});

// роут является защищенным
export default authGuard(uploadHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};
