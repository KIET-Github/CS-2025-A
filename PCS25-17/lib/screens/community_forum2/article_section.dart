import 'package:flutter/material.dart';

class ArticleSection extends StatefulWidget {
  const ArticleSection({Key? key}) : super(key: key);

  @override
  State<ArticleSection> createState() => _ArticleSectionState();
}

class _ArticleSectionState extends State<ArticleSection>
    with TickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    TabController tabcontoller = TabController(length:4 , vsync: this);
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SafeArea(
          child: Column(
            
            crossAxisAlignment:CrossAxisAlignment.start ,
            children:  [
              const Padding(
                padding: EdgeInsets.all(5.0),
                child: TextField(
                 
                  autocorrect: true, cursorColor: Colors.red,
                  enableSuggestions: true,
            
                  // onChanged: (value) => updateList(value) ,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(

                      borderRadius: BorderRadius.all(Radius.circular(100.0)),
                      borderSide: BorderSide(
                        color: Colors.red,
                        width: 10,
                      ),
                    ),
                    // hoverColor: Colors.blueGrey,
                    hintText: "Search here",
                    suffixIcon: Icon(Icons.search_rounded),
                  ),
                  // onChanged:updateList,
                ),
              ),
              const SizedBox(
                height: 15,
              ),
            
             const Text("Explore",
              
              style: TextStyle(color: Colors.black,fontWeight: FontWeight.bold,
              fontSize: 24,)
              ,),
             const SizedBox(
                height: 15,
              ),
              Container(
               child: TabBar(
                 unselectedLabelColor:Colors.redAccent,
                indicatorSize:TabBarIndicatorSize.label,

                controller: tabcontoller,
                indicator: const BoxDecoration(
                  
                  borderRadius: BorderRadius.all(Radius.circular(25)),
                  color: Colors.redAccent,

                ),

                isScrollable: true,
                // labelPadding: const EdgeInsets.all(10),
                 labelPadding: const EdgeInsets.symmetric (horizontal: 5),
                automaticIndicatorColorAdjustment: true,
        
                tabs: [
                Tab(
                  child: Container(
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(25),
                        border: Border.all(color: Colors.redAccent, width: 1)),
                    child: const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Align(
                        alignment: Alignment.center,
                        child: Text("Cognitive"),
                      ),
                    ),
                  ),
                ),
                Tab(
                  child: Container(
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(25),
                        border: Border.all(color: Colors.redAccent, width: 1)),
                    child: const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Align(
                        alignment: Alignment.center,
                        child: Text("Psycomotive"),
                      ),
                    ),
                  ),
                ),
                Tab(
                  child: Container(
                    
                    decoration: BoxDecoration(

                        borderRadius: BorderRadius.circular(25),
                        border: Border.all(color: Colors.redAccent, width: 1)),
                    child: const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Align(
                        alignment: Alignment.center,
                        child: Text("Affective"),
                      ),
                    ),
                  ),
                ),
                 Tab(
                  child: Container(
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(25),
                        border: Border.all(color: Colors.redAccent, width: 1)),
                    child: const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Align(
                        alignment: Alignment.center,
                        child: Text("Mental Health"),
                      ),
                    ),
                  ),
                ),
              ]),
              ),
              const SizedBox(
                height: 20,
              ),
               Expanded(
                child: TabBarView(
                  controller: tabcontoller,
                  children: [
                   ListView.builder(
                  physics: const BouncingScrollPhysics(),
                    itemCount: 3,
                    itemBuilder:((context, index){
                    return Padding(
                      padding: const EdgeInsets.all(5.0),
                      
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          
                          //1st
                          Material(
                            
                             elevation: 5,
                            borderRadius: const BorderRadius.all(Radius.circular(15)),
                            child: Container(margin: const EdgeInsets.fromLTRB(40, 20, 20, 20),
                                                width: double.maxFinite,
                                                
                                                child: Column(
                            children: [
                              Row(
                              
                              children: [
                                Container(
                                  alignment: Alignment.centerLeft,
                                  child: const Text("Read Time:5 min",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                               const Spacer(),               
                                Container(
                                  alignment: Alignment.centerRight,
                                  child: const Text("10 March,2022",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                              ],
                            ),
                           const SizedBox(height: 10,),            
                            const Text("What is the importance of Cognitive Development in child's growth",style: TextStyle(
                              color: Colors.black,fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),),
                              const SizedBox(height: 10,),
                               const Text("Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional.",
                               style: TextStyle(
                                 color: Color.fromARGB(255, 183, 178, 178),
                                 fontSize: 12,
                                 fontWeight: FontWeight.bold,
                               ),),
                              const SizedBox(height: 10,),
                            Row(mainAxisAlignment: MainAxisAlignment.start,
        
                              children: const [
                               Icon(Icons.favorite_border_outlined,size: 15,color:Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.bookmark_add_outlined,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.share,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                              ],
                            )
                            ],
                                                ),
                                                
                                                ),
                          ),
            
                         
                        ],
                      ),
                    );
                  })
                ),
                 ListView.builder(
                  physics: const BouncingScrollPhysics(),
                    itemCount: 3,
                    itemBuilder:((context, index){
                    return Padding(
                      padding: const EdgeInsets.all(5.0),
                      
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          
                          //1st
                          Material(
                            
                             elevation: 5,
                            borderRadius: const BorderRadius.all(Radius.circular(15)),
                            child: Container(margin: const EdgeInsets.fromLTRB(40, 20, 20, 20),
                                                width: double.maxFinite,
                                                
                                                child: Column(
                            children: [
                              Row(
                              
                              children: [
                                Container(
                                  alignment: Alignment.centerLeft,
                                  child: const Text("Read Time:5 min",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                               const Spacer(),               
                                Container(
                                  alignment: Alignment.centerRight,
                                  child: const Text("10 March,2022",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                              ],
                            ),
                           const SizedBox(height: 10,),            
                            const Text("What is the importance of Cognitive Development in child's growth",style: TextStyle(
                              color: Colors.black,fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),),
                              const SizedBox(height: 10,),
                               const Text("Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional.",
                               style: TextStyle(
                                 color: Color.fromARGB(255, 183, 178, 178),
                                 fontSize: 12,
                                 fontWeight: FontWeight.bold,
                               ),),
                              const SizedBox(height: 10,),
                            Row(mainAxisAlignment: MainAxisAlignment.start,
        
                              children: const [
                               Icon(Icons.favorite_border_outlined,size: 15,color:Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.bookmark_add_outlined,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.share,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                              ],
                            )
                            ],
                                                ),
                                                
                                                ),
                          ),
            
                         
                        ],
                      ),
                    );
                  })
                ),
                  ListView.builder(
                  physics: const BouncingScrollPhysics(),
                    itemCount: 3,
                    itemBuilder:((context, index){
                    return Padding(
                      padding: const EdgeInsets.all(5.0),
                      
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          
                          //1st
                          Material(
                            
                             elevation: 5,
                            borderRadius: const BorderRadius.all(Radius.circular(15)),
                            child: Container(margin: const EdgeInsets.fromLTRB(40, 20, 20, 20),
                                                width: double.maxFinite,
                                                
                                                child: Column(
                            children: [
                              Row(
                              
                              children: [
                                Container(
                                  alignment: Alignment.centerLeft,
                                  child: const Text("Read Time:5 min",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                               const Spacer(),               
                                Container(
                                  alignment: Alignment.centerRight,
                                  child: const Text("10 March,2022",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                              ],
                            ),
                           const SizedBox(height: 10,),            
                            const Text("What is the importance of Cognitive Development in child's growth",style: TextStyle(
                              color: Colors.black,fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),),
                              const SizedBox(height: 10,),
                               const Text("Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional. ",
                               style: TextStyle(
                                 color: Color.fromARGB(255, 183, 178, 178),
                                 fontSize: 12,
                                 fontWeight: FontWeight.bold,
                               ),),
                              const SizedBox(height: 10,),
                            Row(mainAxisAlignment: MainAxisAlignment.start,
        
                              children: const [
                               Icon(Icons.favorite_border_outlined,size: 15,color:Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.bookmark_add_outlined,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.share,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                              ],
                            )
                            ],
                                                ),
                                                
                                                ),
                          ),
            
                         
                        ],
                      ),
                    );
                  })
                ),
                ListView.builder(
                  physics: const BouncingScrollPhysics(),
                    itemCount: 3,
                    itemBuilder:((context, index){
                    return Padding(
                      padding: const EdgeInsets.all(5.0),
                      
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          
                          //1st
                          Material(
                            
                             elevation: 5,
                            borderRadius: const BorderRadius.all(Radius.circular(15)),
                            child: Container(margin: const EdgeInsets.fromLTRB(40, 20, 20, 20),
                                                width: double.maxFinite,
                                                
                                                child: Column(
                            children: [
                              Row(
                              
                              children: [
                                Container(
                                  alignment: Alignment.centerLeft,
                                  child: const Text("Read Time:5 min",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                               const Spacer(),               
                                Container(
                                  alignment: Alignment.centerRight,
                                  child: const Text("10 March,2022",style: TextStyle(color: Colors.red,fontSize: 12),),
                                ),
                              ],
                            ),
                           const SizedBox(height: 10,),            
                            const Text("What is the importance of Cognitive Development in child's growth",style: TextStyle(
                              color: Colors.black,fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),),
                              const SizedBox(height: 10,),
                               const Text("Children grow and develop rapidly in their first five years across the four main areas of development. These areas are motor (physical), language and communication, cognitive and social/emotional. ",
                               style: TextStyle(
                                 color: Color.fromARGB(255, 183, 178, 178),
                                 fontSize: 12,
                                 fontWeight: FontWeight.bold,
                               ),),
                              const SizedBox(height: 10,),
                            Row(mainAxisAlignment: MainAxisAlignment.start,
        
                              children: const [
                               Icon(Icons.favorite_border_outlined,size: 15,color:Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.bookmark_add_outlined,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                                Icon(Icons.share,size: 15,color: Color.fromARGB(255, 106, 101, 101),),
                              ],
                            )
                            ],
                                                ),
                                                
                                                ),
                          ),
            
                         
                        ],
                      ),
                    );
                  })
                ),
                
                
                ],
                ),
               
               ) 
              
            ],
            
            
            
            
          ),
        ),
      ),
    );
  }
}
