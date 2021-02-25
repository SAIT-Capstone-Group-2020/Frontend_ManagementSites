import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class FileManager {

    public String fileName;
    // public ArrayList<Item> items = new ArrayList<Item>();

    public FileManager(String fileName) {
        this.fileName = fileName;
    }

    // ArrayList<Item>
    public void readFile() throws IOException {

        // Prints line that should have headers, will remove later
        BufferedReader fileData = new BufferedReader(new FileReader(this.fileName));
        System.out.println(fileData.readLine());

        // reads second line
        String fileLine = fileData.readLine();

        // checks if the current line is null
        while (fileLine != null) {

            String[] itemParts = fileLine.split(",");

            String productName = itemParts[0];
            String description = itemParts[1];
            String brand = itemParts[2];
            double price = Double.parseDouble(itemParts[3]);
            int category = Integer.parseInt(itemParts[4]);
            int active = Integer.parseInt(itemParts[5]);
            int quantity = Integer.parseInt(itemParts[6]);
            double weight = Double.parseDouble(itemParts[7]);
            int weightType = Integer.parseInt(itemParts[8]);

            // retrieves next line
            fileLine = fileData.readLine();

            // This line is used to print the line to the console, to test if it's read properly
            
              /* System.out.printf("%s %10s %10s %10.2f %10d %10d %10d %10.2f %10s %n", productName, description, brand, price, category, active, 
              quantity, weight, weightType);
              */
             

            // This line is used to create a new object when the backend connection is made
            /*
             * Item newItem = new Item(productId, productName, price, category, quantity,
             * weight, weightType, brand);
             * 
             * items.add(newItem);
             * 
             */

        }

        fileData.close();
        // return items;
    }

    // METHOD WILL BE UNCOMMENTED WHEN CONNECTION IS READY

     /* public void writeFile(ArrayList<String> items) throws IOException {
        BufferedWriter fileData = new BufferedWriter(new FileWriter(this.fileName));

        for (int i = 0; i < items.size(); i++) {

            Item item = items.get(i);
            
            String productName = item.getName();
            String description = item.getDescription();
            String brand = item.getBrand();
            String price = (String) item.getPrice():
            String category = (String) item.getCategory();
            String active = (String) item.getActive();
            String quantity = (String) item.getQuantity();
            String weight = (String) item.getWeight();
            String weightType = (String) item.getWeightType();

            fileData.write(productName + "," + description + "," + brand + "," + price 
            + "," + category + "," + active + "," + quantity + "," + weight + "," + weightType);
            
            fileData.newLine();
        }

        fileData.close();
    }
    */
    
}
