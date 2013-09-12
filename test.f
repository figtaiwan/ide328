\ test.f
DECIMAL
VARIABLE V 1000 V !
5 PB OUTPUT
: W V @ MS ;
: H 5 PB HIGH ;
: L 5 PB LOW ;
: F H W L W ;
\ FORGET Z
: Z 
  BEGIN  F ?KEY DUP
    IF     OVER DUP $2B = SWAP 61 = OR \ is key + or = ?
      IF   V @ 2* V ! 2DROP 0
      ELSE OVER DUP $2D = SWAP 95 = OR \ is key - or _ ?
        IF V @ 2/ V ! 2DROP 0
        THEN
      THEN
    THEN
  UNTIL ;
