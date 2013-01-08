var buttons = document.getElementsByTagName('button');
var i = buttons.length;

/*
Silliness! The value of i will be -1 for every button clicked:
the value of i is not bound to the scope of the functions being
declared, and will end up being -1.

while (i--) {
    buttons[i].onclick = function () {
        console.log(i);
    };
}
*/

/*
Better - at least the buttons are logging the right values!
What is happening here?
We are creating an IIFE - an immediately invoked
function expression, and binding it to onclick.

Notice the (i). There we are actually invoking the
function and passing in i as an argument. It appears in
the outer function signature as j.

Notice that the function is returning another function.
Thi is what we are actually invoking when the onclick is activated.
It is declared in a new level of scope - alongside the variable j.
The value of j is enclosed with it (I presume this is what we
refer to as closure)

But ... ugly!

while (i--) {
    buttons[i].onclick = function (j) {
        return function () {
            console.log(j);
        };
    }(i);
}
*/

/*
Get this. Props to Angus Croll.
https://www.youtube.com/watch?v=MFtijdklZDo

Here is another way of extending the scope chain.
And it's tighter!

The object { j: i } is positioned at the 'head' on a new
level of scope. What does this mean?
We have references to j. JavaScript will look in the
local scope for a value to assign to j, and find the
reference to i in the extended scope provided by with().

Be aware that the while() loop has no braces shown in
this example, the braces are from the with().

You could even replace all the 'j's with 'i's and it
would work, but that's getting a little too tricksy
for something many JS devs avoid using anyway.
*/


while (i--) with ({j:i}) {
    buttons[j].onclick = function () {
        console.log(j);
    };
}





