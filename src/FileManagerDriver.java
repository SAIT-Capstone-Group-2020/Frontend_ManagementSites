
import java.io.IOException;
import java.util.Scanner;

/*
* NOTE: THIS FILE WON'T EXIST IN THE FINAL ENVIRONMENT. IT IS MERELY HERE TO TEST 
*       THE FILEMANAGER CLASS. FILEMANAGER WILL HAVE THE METHOD TO RECEIVE 
*       THE FILE PATH FROM THE JS ELEMENT THAT CALLS IT.
*/

public class FileManagerDriver {
    public static void main(String args[]) throws IOException {
        System.out.print("Enter the file path: ");

        Scanner fileName = new Scanner(System.in);

        String file = fileName.nextLine();

        FileManager fileManager = new FileManager(file);

        fileManager.writeFile();

        fileName.close();
    }
}