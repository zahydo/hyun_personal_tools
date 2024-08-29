import { lstatSync, readdirSync, mkdirSync } from 'fs';

import { extname } from 'path'
import sharp from 'sharp';

const VALID_EXT_NAME_FOR_IMAGES = [".jpeg",".jpg", ".png", ".PNG", ".JPG", ".JPEG"]


const getFileNamesByFolderName = (path) => {
    const fileNames = [];
    try {
        const names = readdirSync(path);
        for (const name of names)
            fileNames.push(name)
    } catch (err) {
        console.error(err);
    }
    return fileNames
}

const createDirectoryIfNotExists = (directory) => {
    try {
        if (lstatSync(directory).isDirectory()) {
            console.log(`El directorio ${directory} ya existe`);
        } else {
            console.error(`El path ${directory} ya existe y no es un directorio`);
        }
    } catch (err) {
        if (err) {
            if (err.code === 'ENOENT') {
                try {
                    mkdirSync(directory);
                    console.log(`El directorio ${directory} ha sido creado`);
                } catch (error) {
                    console.error(`Error al crear el directorio ${directory}: ${error}`);
                }
            } else {
                console.error(`Error al verificar la existencia del directorio ${directory}: ${err}`);
            }
        }
    }
}

const isDirectory = (path) => {
    try {
        return lstatSync(path).isDirectory()
    } catch (error) {
        console.error(error);
        return null
    }
}

const isImage = (path) => {
    return VALID_EXT_NAME_FOR_IMAGES.includes(extname(path))
}

const getNameWithoutExt = (fileName) => {
    if (!!fileName) {
        return fileName.replace(extname(fileName), "")
    } else {
        return null
    }
}


/** This function only works locally in the file system on the machine where is running
 * 
 * @param {*} folderPath Path (in the file system) where the images are
 * @param {*} fileExtension The desired
 */
export default function scaleImagesFromFolder(folderPath, fileExtension = ".jpg") {
    if (!!folderPath && !!isDirectory(folderPath)) {
        const compressedPath = `${folderPath}/Compressed/`;
        createDirectoryIfNotExists(compressedPath)
        const paths = getFileNamesByFolderName(folderPath);

        paths.forEach(fileName => {
            const _path = `${folderPath}/${fileName}`
            if (!isDirectory(_path) && isImage(fileName)) {
                const newFileName = `${compressedPath}${getNameWithoutExt(fileName)}${fileExtension}`;
                console.log("New file: ", newFileName)
                sharp(_path).resize(800, 800).toFile(newFileName)
            }
        })
    } else {
        console.error(`Path: '${folderPath}' is not valid`)
    }
}