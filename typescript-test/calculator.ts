export type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (a: number, b: number, op : Operation): number => {
    switch(op)
    {

        case 'multiply': return a * b;
        case 'add': return a + b;
        case 'divide': if (b === 0) throw new Error('can\'t divide by 0!');
                        return a / b;
        default: throw new Error('Operation is not allowed')
    }
}
  
try {
    console.log(calculator(1, 5 , 'divide'));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }