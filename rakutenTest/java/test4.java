import java.util.Scanner;

class test5 {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int indexX = 0;
		int indexY = 0;
		boolean isS = false;
		System.out
				.println("Given a 2D board and a word, find if the word exists in the grid.");
		System.out.print("Please input the board's width: ");
		int width = input.nextInt();
		System.out.print("Please input the board's height: ");
		int height = input.nextInt();
		char[][] charlist = new char[height][width];
		boolean[][] went = new boolean[height][width];
		System.out.print("Please input the " + height * width
				+ " words spilt by space or enter: ");
		char letter;
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				letter = input.next().charAt(0);
				charlist[i][j] = letter;
			}
		}
		System.out.println("Your 2D board is: ");
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				System.out.print(charlist[i][j] + " ");
			}
			System.out.println();
		}
		System.out
				.print("Please input the word to check if the word exists in the grid: ");
		String word = input.next();
		System.out.println("Your: " + word);
		System.out.print("Result: ");
		for (int i = 0; i < height; i++) {
			for (int j = 0; j < width; j++) {
				if (isPass(charlist, word, 0, i, j, "start")) {
					isS = true;
					break;
				} else {

				}
			}
		}
		System.out.println(isS);

	}

	public static boolean isPass(char[][] arr, String word, int index,
			int xIndex, int yIndex, String beforeStep) {
		// arr:charlist; index:word's char index; xIndex,yIndex:position;
		// beforeStep:from where

		if (xIndex < 0 || xIndex >= 4 || yIndex < 0 || yIndex >= 4) {
			return false;
		} else if (word.charAt(index) == arr[xIndex][yIndex]) {

			if (index == word.length() - 1) {
				return true;

			} else {

				index = index + 1;
				if (beforeStep == "start") {

					if (isPass(arr, word, index, xIndex - 1, yIndex, "down")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, 1 + yIndex,
							"left")) {
						return true;
					} else if (isPass(arr, word, index, 1 + xIndex, yIndex,
							"up")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, yIndex - 1,
							"right")) {
						return true;
					} else {
						return false;
					}

				} else if (beforeStep == "up") {
					if (isPass(arr, word, index, 1 + xIndex, yIndex, "up")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, 1 + yIndex,
							"left")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, yIndex - 1,
							"right")) {
						return true;
					} else {
						return false;
					}

				} else if (beforeStep == "right") {
					if (isPass(arr, word, index, xIndex - 1, yIndex, "down")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, yIndex - 1,
							"right")) {
						return true;
					} else if (isPass(arr, word, index, 1 + xIndex, yIndex,
							"up")) {
						return true;
					} else {
						return false;
					}
				} else if (beforeStep == "down") {
					if (isPass(arr, word, index, xIndex, 1 + yIndex, "left")) {
						return true;
					} else if (isPass(arr, word, index, xIndex - 1, yIndex,
							"down")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, yIndex - 1,
							"right")) {
						return true;
					} else {
						return false;
					}
				} else if (beforeStep == "left") {
					if (isPass(arr, word, index, xIndex - 1, yIndex, "down")) {
						return true;
					} else if (isPass(arr, word, index, 1 + xIndex, yIndex,
							"up")) {
						return true;
					} else if (isPass(arr, word, index, xIndex, 1 + yIndex,
							"left")) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}

			}

		} else {
			return false;
		}
	}
}