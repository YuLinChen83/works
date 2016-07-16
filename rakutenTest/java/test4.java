import java.util.Scanner;
class test5 {
	public static void main(String[] args) {
    System.out.println("Given a 2D board and a word, find if the word exists in the grid.");
    System.out.print("Please input the board's width: ");
    Scanner input = new Scanner(System.in);
    int n = input.nextInt();
    char[][] words = new char[n][n];
    boolean[][] went = new boolean[n][n];
    System.out.print("Please input the "+n*n+" words spilt by space: ");
    char word;
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            word = input.next().charAt(0);
            words[i][j]=word;
        }
        
    }
    System.out.println("Your 2D board is: ");
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            System.out.print(words[i][j]+" ");
        }
        System.out.println();
    }
    System.out.print("Please input the word to check if the word exists in the grid: ");
    String wordss = input.next();
    System.out.println("Your : "+wordss);
    System.out.println(point(words,0,0,wordss,0,went));
    
	}

public static String point(char[][] words ,int arrayX, int arrayY, String word, int charindex, boolean[][] went) {
    int index = charindex;
    int x = arrayX;
    int y = arrayY;
System.out.println("x : "+x);
System.out.println("y : "+y);
System.out.println("word.charAt(charindex) : "+word.charAt(charindex));
        if(x-1>=0 && words[x-1][y]==word.charAt(charindex)){

            if(went[x-1][y]=true){
            }else{
                arrayX=x-1;
                arrayY=y;
                went[x-1][y]=true;
                charindex++;
                point(words, arrayX, arrayY, word, charindex, went);
            }
            
        }else if(x+1 <= words[0].length-1 && words[x+1][y]==word.charAt(charindex)){

            if(went[x+1][y]=true){
                
            }else{
                arrayX=x+1;
                arrayY=y;
                went[x+1][y]=true;
                charindex++;
                point(words, arrayX, arrayY, word, charindex, went);
            }
            
        }else if(y+1 <= words[0].length-1 && words[x][y+1]==word.charAt(charindex)){

            if(went[x][y+1]=true){
                
            }else{
                arrayX=x;
                arrayY=y+1;
                went[x][y+1]=true;
                charindex++;
                point(words, arrayX, arrayY, word, charindex, went);
            }
        }else if(y-1>=0 && words[x][y-1]==word.charAt(charindex)){

            if(went[x][y-1]=true){
                
            }else{
                arrayX=x;
                arrayY=y-1;
                went[x][y-1]=true;
                charindex++;
                point(words, arrayX, arrayY, word, charindex, went);
            }
        }else{
            System.out.println("charindex : "+charindex);
            System.out.println("word.length()-1 : "+(word.length()-1));
            if(charindex==word.length()-1){
                return "true";
            }else{
                return "false";
            }
        }
        return "false";

}


}