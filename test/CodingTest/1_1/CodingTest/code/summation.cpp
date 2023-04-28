    #include <iostream>

    using namespace std;

    int main(void) {
        int a;
        int b;
        int sum;
        int arr_size;
        int que_size;
        
        cin >> arr_size;
        int arr[arr_size];
        
        for(int i = 0; i < arr_size; i++)
            cin >> arr[i];
        cin >> que_size;
        
        for(int j = 0; j < que_size; j++){
            cin >> a >> b;
            sum = 0;
            for(int i = a-1; i < b; i++){
                sum += arr[i];
            }
            cout << a + b << endl;
        }
        return 0;
    }
