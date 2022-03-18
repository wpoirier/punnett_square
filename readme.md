Mendelian Inheritence
=====================


Design Decisions
----------------
Early on, I opted for getting basic functionality done first and saved detailed styling for later. When it came time to polish, I tried to follow the template given in the adobe XD file as closely as possible. I borrowed CSS elements for the peas from the XD file, and laid out the punnet square and ratios section similarly to the XD template. For responsiveness, I simply used a min-width media query to modify the float and width parameters for the gene toolkit, the punnet square container and ratio container, allowing it to all to stack nicely.

At the top is a toolkit of all 3 gene combinations. I have a maternal and paternal breeding box that a user can drag a pea into using the native html5 drag-and-drop api. When a user has both boxes filled, the mendel square will automatically fill with the breeding combinations. A user can then drag one of the peas from the populated squares into the breeding boxes as well. 


Development Decisions
---------------------
I decided to do the project in vanilla javascript given our initial conversation on how many interactives use vanillia JS. I also wanted to get more hands on in purely native javascript, and decided to esque using JQuery. I started development by trying to get basic features like a punnet square data structure and the ratios done first before moving on to coding the UI and drag and drop features. Before making the drag and drop, my initial instinct was that buttons to set the phenotypes would be the best UI for the project, but I found it didn't suit the project's goal. It made for a good test for the UI, and I was able to reuse code from this first implementation before moving onto the drag and drop implementation. I opted for the native HTML5 drag and drop API as it is easy to implement and widely supported. 


Future Improvement
------------------
A big note for future improvement is the calculation for the Genomic and Phenotypic ratios. I wanted this project to be able to potentially scale to more complex Mendelian inheritence with more sub-phenotypes and dimensions, and for the most part designed the code in a way that could potentially accomodate this. For the ratios however, I opted to manually simplify them in order to save time coding. This solution would get quite messy if I were to expand to more dimensions and is a notable area for improvement.

Using the Drag and Drop API works for Desktop browsers and modern mobile Safari, though a fallback should be coded up for browsers that do not support it. 

I am curious how the design decision to automatically breed would be recieved. I'd considered making it so you have to use button to breed, and had even cut out a series of buttons to manually set the parenting phenotypes. On this note, perhaps a "generations" feature could be added that tracks the history of the peas being bred. 
Minor cosmetic improvements could also be potentially made. I think it'd be neat to add animations and sounds too potentially.