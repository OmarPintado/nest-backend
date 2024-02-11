import { v4 as uuid } from 'uuid';
export const fileNamerHelper = (
  //Esta función es para validar si se admite o no el archivo subido.
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File Empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const fileName: string = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
