# Dataturks 数据格式

### 支持格式汇总

[CLASSIFICATION, DETECTION, TEXT_DETECTION, SEGMENTATION, NER, TEXT_CLASSIFICATION, TEXT_SUMMARIZATION]

### Image

#### 图像分类 Image Classification -- CLASSIFICATION

- 未标注

  A text file containing URLs of images.

  ```reStructuredText
  https://www.cc98.org/static/images/default_avatar_girl.png
  https://www.cc98.org/static/images/default_avatar_boy.png
  http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg
  http://file.cc98.org/v2-upload/pxgz2rx4.jpeg
  ```

- 已标注

  A text file with each line in file having input sentence in following tab separated format.

  ```reStructuredText
  Image_URL          Comma Separated Labels      Extra KeyValue Pair1(optional)    Extra KeyValue Pair1(optional)
  <http://amazonaws.com/grande.jpg> Class1, Class2, Class3 id=1 context=image1
  <http://amazonaws.com/Carraway.jpg> Class1 id=2 context=image2 site=34
  <http://amazonaws.com/slices.jpg> Class1, Class2 id=32

  ```

- 标注完

  A text file where each line is a JSON containing the image URL and the classes marked for the image.

  ```json
  {"content": "https://www.cc98.org/static/images/default_avatar_girl.png","annotation":{"labels":["Dog"],"note":""}}

  {"content": "https://www.cc98.org/static/images/default_avatar_boy.png","annotation":{"labels":["Cat","Dog"],"note":""},"extras":null,"metadata":{"first_done_at":1600153206000,"last_updated_at":1600153206000,"sec_taken":13,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg","annotation":{"labels":["Cat"],"note":""},"extras":null,"metadata":{"first_done_at":1600153208000,"last_updated_at":1600153208000,"sec_taken":2,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/v2-upload/pxgz2rx4.jpeg","annotation":{"labels":["Cat","Dog"],"note":""},"extras":null,"metadata":{"first_done_at":1600153227000,"last_updated_at":1600153227000,"sec_taken":0,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  ```

#### 目标检测、文本检测 Image Bounding Box (矩形) -- DETECTION / TEXT_DETECTION

- 未标注

  A text file containing URLs of images.

  ```reStructuredText
  https://www.cc98.org/static/images/default_avatar_girl.png
  https://www.cc98.org/static/images/default_avatar_boy.png
  http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg
  http://file.cc98.org/v2-upload/pxgz2rx4.jpeg
  ```

- 已标注

  A text file with each line in file having input sentence in following json format. **Content** contains image url, **annotation** has the co-ordinate of polygon [first and last value of array is of same co-ordinate], **extras** is for some extra columns that you want to show with each row.

  ```reStructuredText
  {"content":"https://s3.amazonaws.com/com.dataturks.uploads/airplanes__image_0001.jpg","annotation":[{"label":"Airplane","points":[[0.2500753738173288,0.20270832379659018],[0.34806532356607256,0.4579166571299235],[0.6143969818575299,0.40583332379659015],[0.7400251225610475,0.42145832379659015],[0.7927889416565248,0.5620833237965902],[0.8681658260786353,0.6245833237965902],[0.8983165798474796,0.7131249904632568],[0.8204271326112986,0.7443749904632568],[0.7274623084906957,0.7704166571299235],[0.6093718562293892,0.7235416571299235],[0.551582911505771,0.7443749904632568],[0.4762060270836605,0.8016666571299235],[0.43097989643039414,0.7443749904632568],[0.34304019793793183,0.7027083237965902],[0.23248743411883638,0.7131249904632568],[0.1420351728123037,0.6766666571299235],[0.09178391653089667,0.6089583237965902],[0.11188441904345948,0.44749999046325684],[0.16967336376707756,0.4579166571299235],[0.14957286125451477,0.3172916571299235],[0.1420351728123037,0.2079166571299235],[0.25510049944546953,0.19749999046325684],[0.2500753738173288,0.20270832379659018]],"imageWidth":398,"imageHeight":164}],"extras":null}
  ```

- 标注完

  A text file where each line is a JSON containing the image URL and the coordinates of the bounded objects in the image.

  ```json
  {"content": "https://www.cc98.org/static/images/default_avatar_girl.png","annotation":[{"label":["province"],"shape":"rectangle","points":[[0.4125,0.3125],[0.88125,0.3125],[0.88125,0.80625],[0.4125,0.80625]],"notes":"","imageWidth":160,"imageHeight":160}],"extras":null,"metadata":{"first_done_at":1600154411000,"last_updated_at":1600154411000,"sec_taken":20,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "https://www.cc98.org/static/images/default_avatar_boy.png","annotation":[{"label":["prive"],"shape":"rectangle","points":[[0.28125,0.35625],[0.83125,0.35625],[0.83125,0.86875],[0.28125,0.86875]],"notes":"","imageWidth":160,"imageHeight":160}],"extras":null,"metadata":{"first_done_at":1600154390000,"last_updated_at":1600154390000,"sec_taken":4,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg","annotation":[{"label":["prive"],"shape":"rectangle","points":[[0.043795620437956206,0.19230769230769232],[0.7883211678832117,0.19230769230769232],[0.7883211678832117,0.7207357859531772],[0.043795620437956206,0.7207357859531772]],"notes":"","imageWidth":548,"imageHeight":598},{"label":["prive"],"shape":"rectangle","points":[[0.9032846715328468,0.27591973244147155],[0.6405109489051095,0.27591973244147155],[0.6405109489051095,0.9080267558528428],[0.9032846715328468,0.9080267558528428]],"notes":"","imageWidth":548,"imageHeight":598}],"extras":null,"metadata":{"first_done_at":1600154385000,"last_updated_at":1600154385000,"sec_taken":6,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/v2-upload/pxgz2rx4.jpeg","annotation":[{"label":["province"],"shape":"rectangle","points":[[0.28484848484848485,0.18787878787878787],[0.703030303030303,0.18787878787878787],[0.703030303030303,0.6484848484848484],[0.28484848484848485,0.6484848484848484]],"notes":"","imageWidth":165,"imageHeight":165},{"label":["prive"],"shape":"rectangle","points":[[0.8787878787878788,0.4303030303030303],[0.8,0.4303030303030303],[0.8787878787878788,0.8666666666666667],[0.8,0.8666666666666667]],"notes":"","imageWidth":165,"imageHeight":165}],"extras":null,"metadata":{"first_done_at":1600154378000,"last_updated_at":1600154378000,"sec_taken":76,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  ```

#### 目标检测、文本检测 Image Bounding Box (多边形) -- DETECTION / TEXT_DETECTION

- 未标注

  A text file containing URLs of images.

  ```reStructuredText
  https://www.cc98.org/static/images/default_avatar_girl.png
  https://www.cc98.org/static/images/default_avatar_boy.png
  http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg
  http://file.cc98.org/v2-upload/pxgz2rx4.jpeg
  ```

- 已标注

  A text file with each line in file having input sentence in following json format. **Content** contains image url, **annotation** has the co-ordinate of polygon [first and last value of array is of same co-ordinate], **extras** is for some extra columns that you want to show with each row.

  ```reStructuredText
  {"content":"https://s3.amazonaws.com/com.dataturks.uploads/airplanes__image_0001.jpg","annotation":[{"label":"Airplane","points":[[0.2500753738173288,0.20270832379659018],[0.34806532356607256,0.4579166571299235],[0.6143969818575299,0.40583332379659015],[0.7400251225610475,0.42145832379659015],[0.7927889416565248,0.5620833237965902],[0.8681658260786353,0.6245833237965902],[0.8983165798474796,0.7131249904632568],[0.8204271326112986,0.7443749904632568],[0.7274623084906957,0.7704166571299235],[0.6093718562293892,0.7235416571299235],[0.551582911505771,0.7443749904632568],[0.4762060270836605,0.8016666571299235],[0.43097989643039414,0.7443749904632568],[0.34304019793793183,0.7027083237965902],[0.23248743411883638,0.7131249904632568],[0.1420351728123037,0.6766666571299235],[0.09178391653089667,0.6089583237965902],[0.11188441904345948,0.44749999046325684],[0.16967336376707756,0.4579166571299235],[0.14957286125451477,0.3172916571299235],[0.1420351728123037,0.2079166571299235],[0.25510049944546953,0.19749999046325684],[0.2500753738173288,0.20270832379659018]],"imageWidth":398,"imageHeight":164}],"extras":null}
  ```

- 标注完

  A text file where each line is a JSON containing the image URL and the coordinates of the bounded objects in the image.

  ```json
  {"content": "https://www.cc98.org/static/images/default_avatar_girl.png","annotation":[{"label":["province"],"shape":"polygon","points":[[0.3125,0.275],[0.5875,0.28125],[0.69375,0.64375],[0.2375,0.725]],"notes":"","imageWidth":160,"imageHeight":160}],"extras":null,"metadata":{"first_done_at":1600154961000,"last_updated_at":1600154961000,"sec_taken":6,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "https://www.cc98.org/static/images/default_avatar_boy.png","annotation":[{"label":["prive"],"shape":"polygon","points":[[0.2,0.83125],[0.50625,0.7375],[0.73125,0.75],[0.7875,0.88125],[0.69375,0.9125],[0.475,0.95625],[0.1375,0.9625],[0.5875,0.525]],"notes":"","imageWidth":160,"imageHeight":160}],"extras":null,"metadata":{"first_done_at":1600154941000,"last_updated_at":1600154941000,"sec_taken":11,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg","annotation":[{"label":["prive"],"shape":"polygon","points":[[0.06934306569343066,0.0451505016722408],[0.1989051094890511,0.043478260869565216],[0.20802919708029197,0.07357859531772576],[0.20072992700729927,0.11204013377926421],[0.06386861313868614,0.10367892976588629],[0.04927007299270073,0.08361204013377926],[0.13503649635036497,0.07525083612040134]],"notes":"","imageWidth":548,"imageHeight":598},{"label":["prive"],"shape":"polygon","points":[[0.26277372262773724,0.47157190635451507],[0.49635036496350365,0.3879598662207358],[0.7208029197080292,0.5351170568561873],[0.6678832116788321,0.6588628762541806],[0.5766423357664233,0.7508361204013378],[0.4051094890510949,0.7107023411371237],[0.5620437956204379,0.5284280936454849],[0.48175182481751827,0.5434782608695652],[0.3886861313868613,0.46488294314381273],[0.26824817518248173,0.5016722408026756],[0.2718978102189781,0.46321070234113715]],"notes":"","imageWidth":548,"imageHeight":598}],"extras":null,"metadata":{"first_done_at":1600154949000,"last_updated_at":1600154973000,"sec_taken":0,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/v2-upload/pxgz2rx4.jpeg","annotation":[{"label":["company"],"shape":"polygon","points":[[0.3090909090909091,0.15757575757575756],[0.5454545454545454,0.2],[0.7333333333333333,0.48484848484848486],[0.44242424242424244,0.6484848484848484],[0.19393939393939394,0.46060606060606063]],"notes":"","imageWidth":165,"imageHeight":165}],"extras":null,"metadata":{"first_done_at":1600154930000,"last_updated_at":1600154930000,"sec_taken":17,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}

  ```

#### 图像分割 Image Segmentation (多边形) -- SEGMENTATION

- 未标注

  A text file containing URLs of images.

  ```reStructuredText
  https://www.cc98.org/static/images/default_avatar_girl.png
  https://www.cc98.org/static/images/default_avatar_boy.png
  http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg
  http://file.cc98.org/v2-upload/pxgz2rx4.jpeg
  ```

- 已标注

  A text file with each line in file having input sentence in following json format. **Content** contains image URL, **annotation** has the co-ordinate of polygon [first and last value of array is of same co-ordinate], **extras** is for some extra columns that you want to show with each row.

  ```reStructuredText
  {"content":"https://s3.amazonaws.com/com.dataturks.uploads/airplanes__image_0001.jpg","annotation":[{"label":"Airplane","points":[[0.2500753738173288,0.20270832379659018],[0.34806532356607256,0.4579166571299235],[0.6143969818575299,0.40583332379659015],[0.7400251225610475,0.42145832379659015],[0.7927889416565248,0.5620833237965902],[0.8681658260786353,0.6245833237965902],[0.8983165798474796,0.7131249904632568],[0.8204271326112986,0.7443749904632568],[0.7274623084906957,0.7704166571299235],[0.6093718562293892,0.7235416571299235],[0.551582911505771,0.7443749904632568],[0.4762060270836605,0.8016666571299235],[0.43097989643039414,0.7443749904632568],[0.34304019793793183,0.7027083237965902],[0.23248743411883638,0.7131249904632568],[0.1420351728123037,0.6766666571299235],[0.09178391653089667,0.6089583237965902],[0.11188441904345948,0.44749999046325684],[0.16967336376707756,0.4579166571299235],[0.14957286125451477,0.3172916571299235],[0.1420351728123037,0.2079166571299235],[0.25510049944546953,0.19749999046325684],[0.2500753738173288,0.20270832379659018]],"imageWidth":398,"imageHeight":164}],"extras":null}
  ```

- 标注完

  A text file where each line is a JSON containing the image URL and the coordinates of the bounded objects in the image.

  ```json
  {"content": "https://www.cc98.org/static/images/default_avatar_girl.png","annotation":[{"label":["province"],"shape":"polygon","points":[[0.16875,0.28125],[0.38125,0.2125],[0.85,0.38125],[0.71875,0.63125],[0.43125,0.6125]],"notes":"","imageWidth":160,"imageHeight":160},{"label":["prive"],"shape":"polygon","points":[[0.3875,0.78125],[0.53125,0.63125],[0.8,0.73125],[0.7875,0.8625],[0.44375,0.88125]],"notes":"","imageWidth":160,"imageHeight":160}],"extras":null,"metadata":{"first_done_at":1600155263000,"last_updated_at":1600155263000,"sec_taken":6,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "https://www.cc98.org/static/images/default_avatar_boy.png","annotation":[{"label":["province"],"shape":"polygon","points":[[0.16875,0.175],[0.35625,0.16875],[0.55625,0.31875],[0.475,0.3875],[0.31875,0.41875],[0.25,0.3375],[0.23125,0.2125]],"notes":"","imageWidth":160,"imageHeight":160},{"label":["company"],"shape":"polygon","points":[[0.24375,0.64375],[0.56875,0.53125],[0.81875,0.6625],[0.64375,0.85],[0.46875,0.80625],[0.30625,0.6875]],"notes":"","imageWidth":160,"imageHeight":160}],"extras":null,"metadata":{"first_done_at":1600155256000,"last_updated_at":1600155256000,"sec_taken":9,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/uploadfile/2015/12/28/13594510305.jpg","annotation":[{"label":["province"],"shape":"polygon","points":[[0.3777372262773723,0.22240802675585283],[0.6459854014598541,0.2625418060200669],[0.677007299270073,0.3795986622073579],[0.6788321167883211,0.5183946488294314],[0.6605839416058394,0.6404682274247492],[0.45255474452554745,0.6739130434782609],[0.3083941605839416,0.580267558528428],[0.5474452554744526,0.451505016722408],[0.6003649635036497,0.43645484949832775],[0.656934306569343,0.3795986622073579],[0.5967153284671532,0.3076923076923077],[0.48722627737226276,0.28595317725752506],[0.36313868613138683,0.2608695652173913],[0.395985401459854,0.21739130434782608],[0.3886861313868613,0.22073578595317725]],"notes":"","imageWidth":548,"imageHeight":598}],"extras":null,"metadata":{"first_done_at":1600155270000,"last_updated_at":1600155270000,"sec_taken":7,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "http://file.cc98.org/v2-upload/pxgz2rx4.jpeg","annotation":[{"label":["company"],"shape":"polygon","points":[[0.2,0.32727272727272727],[0.3878787878787879,0.13333333333333333],[0.5757575757575758,0.2545454545454545],[0.8,0.593939393939394],[0.7151515151515152,0.9333333333333333],[0.1393939393939394,0.5878787878787879],[0.2606060606060606,0.40606060606060607],[0.22424242424242424,0.3515151515151515]],"notes":"","imageWidth":165,"imageHeight":165}],"extras":null,"metadata":{"first_done_at":1600155276000,"last_updated_at":1600155276000,"sec_taken":5,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  ```

### Text

#### 文档标注 Document Annotation (一个实体一个标签)

- 未标注

  A valid text/doc/pdf file **OR** a zip file of all the text/pdf/doc documents.

  ```reStructuredText
  今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。
  以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。
  蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。
  绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。
  网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。
  从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。
  如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！
  ```

- 已标注

  A text file with each line in file having input sentence in following json format. **Content** contains input text, **annotation** has the labeled content, **extras** is for some extra columns that you want to show with each row.

  ```json
  {
    "content": "cd players and tuners",
    "annotation": [
      {
        "label": ["Category"],
        "points": [{ "start": 0, "end": 1, "text": "cd" }]
      },
      {
        "label": ["Category"],
        "points": [{ "start": 3, "end": 9, "text": "players" }]
      },
      {
        "label": ["Category"],
        "points": [{ "start": 15, "end": 20, "text": "tuners" }]
      }
    ],
    "extras": { "Name": "columnName", "Class": "ColumnValue" }
  }
  ```

- 标注完

  A text file where each line is a JSON containing the selected text, start index, end index and marked category.

  Json

  ```json
  {
    "content": "今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。\n以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。\n蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。\n绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。\n网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。\n从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。\n如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！",
    "annotation": [
      {
        "label": ["company"],
        "points": [{ "start": 1370, "end": 1372, "text": "道”，" }]
      },
      {
        "label": ["prive"],
        "points": [
          {
            "start": 993,
            "end": 1170,
            "text": "、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下"
          }
        ]
      },
      {
        "label": ["province"],
        "points": [
          {
            "start": 452,
            "end": 664,
            "text": "大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。\n绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，"
          }
        ]
      }
    ],
    "extras": null,
    "metadata": {
      "first_done_at": 1600158534000,
      "last_updated_at": 1600158534000,
      "sec_taken": 8,
      "last_updated_by": "456456651@qq.com",
      "status": "done",
      "evaluation": "NONE"
    }
  }
  ```

  Stanford NER

  ```reStructuredText
  今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。	O
  以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。	O
  蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派	O
  大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。	province
  绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，	province
  随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。	O
  网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞	O
  、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下	prive
  比较热门。	O
  从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。	O
  如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出	O
  道”，	company
  这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！	O
  ```

#### 命名实体识别 NER Tagging (一个实体一个标签) -- NER

- 未标注

  A Text/CSV file where each line has one data-item to be tagged.

  ```reStructuredText
  今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。
  以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。
  蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。
  绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。
  网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。
  从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。
  如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！
  ```

- 已标注

  A text file with each line in file having input sentence in following json format. **Content** contains input text, **annotation** has the labeled content, **extras** is for some extra columns that you want to show with each row.

  ```json
  {
    "content": "cd players and tuners",
    "annotation": [
      {
        "label": ["Category"],
        "points": [{ "start": 0, "end": 1, "text": "cd" }]
      },
      {
        "label": ["Category"],
        "points": [{ "start": 3, "end": 9, "text": "players" }]
      },
      {
        "label": ["Category"],
        "points": [{ "start": 15, "end": 20, "text": "tuners" }]
      }
    ],
    "extras": { "Name": "columnName", "Class": "ColumnValue" }
  }
  ```

- 标注完

  Json

  ```json
  {"content": "今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。","annotation":[{"label":["province"],"points":[{"start":174,"end":190,"text":"国电视好演员优秀演员”荣誉称号，然"}]},{"label":["prive"],"points":[{"start":13,"end":17,"text":"员”入围名"}]}],"extras":null,"metadata":{"first_done_at":1600159139000,"last_updated_at":1600159139000,"sec_taken":17,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。","annotation":[{"label":["province"],"points":[{"start":40,"end":124,"text":"都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一"}]}],"extras":null,"metadata":{"first_done_at":1600159150000,"last_updated_at":1600159150000,"sec_taken":2,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。","annotation":[{"label":["prive"],"points":[{"start":114,"end":119,"text":"清、蒋欣、李"}]}],"extras":null,"metadata":{"first_done_at":1600159141000,"last_updated_at":1600159141000,"sec_taken":2,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。","annotation":[{"label":["province"],"points":[{"start":116,"end":128,"text":"艺兴等人，女演员有江疏影、"}]}],"extras":null,"metadata":{"first_done_at":1600159144000,"last_updated_at":1600159144000,"sec_taken":2,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。","annotation":[{"label":["province"],"points":[{"start":29,"end":31,"text":"为了更"}]}],"extras":null,"metadata":{"first_done_at":1600159152000,"last_updated_at":1600159152000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。","annotation":[{"label":["prive"],"points":[{"start":38,"end":39,"text":"实是"}]}],"extras":null,"metadata":{"first_done_at":1600159148000,"last_updated_at":1600159148000,"sec_taken":2,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！","annotation":[{"label":["company"],"points":[{"start":31,"end":106,"text":"一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明"}]}],"extras":null,"metadata":{"first_done_at":1600159146000,"last_updated_at":1600159146000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  ```

  Stanford NER

  ```reStructuredText
  今日，第七届“中国电视好演	O
  员”入围名	prive
  单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中	O
  国电视好演员优秀演员”荣誉称号，然	province
  后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。	O

  以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，	O
  都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一	province
  样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。	O

  蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海	O
  清、蒋欣、李	prive
  小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。	O

  绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张	O
  艺兴等人，女演员有江疏影、	province
  金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。	O

  网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也	O
  为了更	province
  好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。	O

  从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其	O
  实是	prive
  很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。	O

  如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我	O
  一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明	company
  星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！	O
  ```

#### 词性标注 PoS Tagging for Small Sentences (貌似有点问题)

- 未标注

  A text/doc/pdf file.

- 已标注

  A text file with each line in file having input sentence in following json format. **Content** contains input text, **annotation** has the labeled content, **extras** is for some extra columns that you want to show with each row.

  ```json
  {
    "content": "cd players and tuners",
    "annotation": [
      {
        "label": ["Category"],
        "points": [{ "start": 0, "end": 1, "text": "cd" }]
      },
      {
        "label": ["Category"],
        "points": [{ "start": 3, "end": 9, "text": "players" }]
      },
      {
        "label": ["Category"],
        "points": [{ "start": 15, "end": 20, "text": "tuners" }]
      }
    ],
    "extras": { "Name": "columnName", "Class": "ColumnValue" }
  }
  ```

- 标注完

  ```json

  ```

#### 文本总结 Text Summarization -- TEXT_SUMMARIZATION

- 未标注

  A text file with each line in file having sentence to be summarized **OR** a zip file of all the text documents to be moderated.

- 已标注

  a text file with each line in file having input sentence in following tab separated format. **Content** contains input text, **annotation** has the labeled content, **extras** is for some extra columns that you want to show with each row.

  ```reStructuredText
  Text Line           Result Text     Extra KeyValue Pair1(optional)    Extra KeyValue Pair1(optional) AFP - India's Tata Iron and Steel Company Ltd.      Tata Iron and Steel Company.    id=1  content=games British Foreign Minister       UK Foreign Minister id=2  content=UK  site=34 Japan carmaker Toyota        Japanese carmaker Toyota    id=100
  ```

- 标注完

  ```reStructuredText
  input	result
  今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。	34
  以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。	1212
  蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。	67
  绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。	23
  网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。	45
  从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。	78
  如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！	56
  ```

#### 文本分类 Text Classification -- TEXT_CLASSIFICATION

- 未标注

  A text file with each line in file having sentence to be classified.

- 已标注

  **TSV** A text file with each line in file having input sentence in following tab separated format.

  ```reStructuredText
  Text Line            Comma Separated Labels      Extra KeyValue Pair1(optional)    Extra KeyValue Pair1(optional)
  ```

  AFP - India's Tata Iron and Steel Company Ltd. Class1, Class2 id=1 content=games
  British Foreign Minister Class4,Class5 id=2 content=UK site=34
  Japan carmaker Toyota Class1 id=100

  ````

  **Json** A text file with each line in file having input sentence in json format.

  ```json
  {
  	"content": "when his eye chanced to fall upon alice, as she stood watching",
  	"annotation": { "labels": ["fiction"], "note": "Alice Speaking" },
  	"extras": null,
  	"metadata": {
  		"first_done_at": 1539871791000,
  		"last_updated_at": 1539871791000,
  		"sec_taken": 0,
  		"last_updated_by": "eMRjkQfSKOVqTlBUJqAKuAj6Tnv1",
  		"status": "done",
  		"evaluation": "NONE"
  	}
  }
  ````

- 标注完

  ```json
  {"content": "今日，第七届“中国电视好演员”入围名单正式公布，此次入围的人还挺多的，可谓是竞争激烈，不仅仅有老派演员、实力派演员，更有我们经常看见的流量小花、小生们，这一次的名单分为四组，分别为红组、蓝组、绿组、网剧组四组，不知道分在绿组的男女演员内心是什么感受，总之我的第一反应是笑喷了！此次推选流程十分清晰，即选择每组投票总和前六名者，每组前六位可以获得“中国电视好演员优秀演员”荣誉称号，然后再从获得荣誉称号的人当中选出最佳演员，这个“最佳演员”每组中男女演员各有一个名次，目前微博和微信均有投票通道，快来为你喜欢的演员投票吧。","annotation":{"labels":["company","prive"],"note":""},"extras":null,"metadata":{"first_done_at":1600159865000,"last_updated_at":1600159865000,"sec_taken":4,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "以下是红组演员名单，我觉得入选到这一组的人肯定特别的优秀，从演员名字和相貌来看，都是一些老牌演员，演技派，男演员有丁勇岱、唐国强、杨立新等人，女演员有丁嘉丽、刘莉莉、奚美娟、张凯丽、赵淑珍等人，自从看了奚美娟的《燃烧》后，就特别喜欢这个演员，有和我一样喜欢她的同学有时间可以看看《燃烧》这部剧，剧情很精彩，是一部悬疑烧脑剧。","annotation":{"labels":["company"],"note":""},"extras":null,"metadata":{"first_done_at":1600159870000,"last_updated_at":1600159870000,"sec_taken":0,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "蓝组演员格外的多，这组演员大咖云集，是流量演技派和演技派大咖的集结之处，很多名字我们都如雷贯耳，如男演员有保剑锋、陈建斌、郭涛、胡军、罗晋、孙红雷、王劲松、印小天、张译、张嘉益、朱亚文等人，女演员有陈数、陈紫函、邓家佳、董洁、海清、蒋欣、李小冉、刘涛、唐嫣、张萌、许晴、陶虹等人，这些人都是近年来有不错作品的演员以及当下有热播剧在播出的演员，值得认可，是闪闪发光的明星，是倍受认可的演员。","annotation":{"labels":["prive"],"note":""},"extras":null,"metadata":{"first_done_at":1600159874000,"last_updated_at":1600159874000,"sec_taken":0,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "绿组演员人数中等，这些演员较之蓝组更为年轻一点，是当下流行的演员们，大多数为流量小花、小生，随便一个话题就会上热搜的人，炙手可热，闪耀夺目，如男演员有陈晓、邓伦、胡一天、黄轩、黄景瑜、李易峰、李现、刘昊然、任嘉伦、檀健次、张新成、张艺兴等人，女演员有江疏影、金晨、蓝盈莹、李纯、李一桐、毛晓彤、马思纯、宋祖儿、倪妮、童瑶、杨紫、赵今麦等人，从这里可以发现是大咖云集，很多人单独拿出来都是可以独当一面的人，从这些分组情况来看，红组、蓝组、绿组是按照咖位以及年龄来分组的，其中蓝组和绿组竞争太激烈了，很期待最后的结果。","annotation":{"labels":["prive"],"note":""},"extras":null,"metadata":{"first_done_at":1600159870000,"last_updated_at":1600159870000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "网剧组的成员很多大家也很熟悉，近年来为了获得更多的关注，也为了更好的推出作品，达到一个快速的结果，很多演员纷纷踏入了网剧的行列，毕竟当代是一个网络化的时代，网络所带来的流量是不可限量的，此次上榜的男演员有白宇、高伟光、韩东君、郭京飞、黄晓明、黄子韬、罗云熙、秦昊、宋威龙、杨洋、易烊千玺、张若昀等人，在我看来易烊千玺、秦昊、张若昀等人是潜力股，很可能会排名靠前，尤其是易烊千玺，毕竟是网络投票，他的粉丝战斗力还是可以的，粉丝群体也很庞大，女演员有白鹿、陈小纭、鞠婧祎、李沁、林允、戚薇、谭松韵、虞书欣、张雨绮、赵露思等人，这一组谭松韵、虞书欣、张雨绮、赵露思胜出的可能性比较大，因为在当下比较热门。","annotation":{"labels":["company","prive"],"note":""},"extras":null,"metadata":{"first_done_at":1600159868000,"last_updated_at":1600159868000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "从投票方式来看，此次获胜者很可能是当下比较热门的演员，为此流量小生在这里面其实是很有优势的，尤其是网剧组，这一组就看作品的热度以及演员们的吸粉能力了，而在老牌演员PK方面，比拼的则是名气，因为很多老牌演员在当下其实并不是走红的类型，他们较为擅长的就是默默的打造作品，不怎么炒作，为此比拼的就是当下的名气了。","annotation":{"labels":["province"],"note":""},"extras":null,"metadata":{"first_done_at":1600159872000,"last_updated_at":1600159872000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  {"content": "如果你喜爱的演员也在其中，请千万不要吝啬你的一票，因为你一票我一票才能送他“出道”，这对于演员们来说何尝不是一次再度出名的机会呢？夺得更多的荣誉对于演员来说才可以打开更多的门，更多的门则代表着更多的资源，上述很多明星我都很喜爱，蓝组和绿组的竞争较为激烈，究竟谁才是最终的王者，11月成都揭晓！","annotation":{"labels":["province"],"note":""},"extras":null,"metadata":{"first_done_at":1600159866000,"last_updated_at":1600159866000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  ```

#### 文本内容审核 Text Moderation (同文本总结)

- 未标注

  A text file with each line in file having sentence to be moderated **OR** a zip file of all the text documents to be moderated.

- 已标注

  A text file with each line in file having input sentence in following tab separated format. **Content** contains input text, **annotation** has the labeled content, **extras** is for some extra columns that you want to show with each row.

  ```reStructuredText
  Text Line           Result Text     Extra KeyValue Pair1(optional)    Extra KeyValue Pair1(optional) AFP - India's Tata Iron and Steel Company Ltd.      Tata Iron and Steel Company.    id=1  content=games British Foreign Minister       UK Foreign Minister id=2  content=UK  site=34 Japan carmaker Toyota        Japanese carmaker Toyota    id=100
  ```

- 标注完

  ```json

  ```

### Video

#### 视频分类 Video Classification -- ACTION_RECOGNITION

- 标注完

  ```json
    {"content": "http://10.214.211.208:8002/wrapper/output/0_0_334_459.mp4","annotation":{"labels":["2"],"note":""},"extras":null,"metadata":{"first_done_at":1621566883000,"last_updated_at":1621566883000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
    {"content": "http://10.214.211.208:8002/wrapper/output/0_15_4014_4091.mp4","annotation":{"labels":["0"],"note":""},"extras":null,"metadata":{"first_done_at":1621566893000,"last_updated_at":1621566893000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
    {"content": "http://10.214.211.208:8002/wrapper/output/0_27_19783_19813.mp4","annotation":{"labels":["2"],"note":""},"extras":null,"metadata":{"first_done_at":1621566891000,"last_updated_at":1621566891000,"sec_taken":2,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
    {"content": "http://10.214.211.208:8002/wrapper/output/1_27_2007_2078.mp4","annotation":{"labels":["0"],"note":""},"extras":null,"metadata":{"first_done_at":1621566888000,"last_updated_at":1621566888000,"sec_taken":1,"last_updated_by":"456456651@qq.com","status":"done","evaluation":"NONE"}}
  ```
