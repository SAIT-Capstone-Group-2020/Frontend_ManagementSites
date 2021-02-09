import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileManagerDriver {
    public static void main(String args[]) throws FileNotFoundException {
        System.out.print("Enter the file path: ");

        Scanner fileName = new Scanner(System.in);

        String file = fileName.nextLine();

        FileManager fileManager = new FileManager(file);

        fileManager.readFile();

        // fileName.close();
    }
}