const $D = Object.create(null);
const $BEND_TAIL = Symbol("bend.tail");
const $td = 64;
const $TAIL_PENDING = Object.create(null), $tailArgs = Array(32);
const $CALL_PENDING = Object.create(null), $LEAVE_PENDING = Object.create(null);
const $stArgs = [], $kFn = [], $kBase = [], $kKind = [];
let $sp = 0, $ksp = 0, $leaveThunk;
function $split(f,count,k,base) { $tailFn=f; $tailCount=count; $kFn[$ksp]=k; $kBase[$ksp]=base; $kKind[$ksp]=0; $ksp+=1; return $CALL_PENDING; }
function $splitm(f,a,k,base) { $tailFn=f; $tailCount=-2; $tailRest=a; $kFn[$ksp]=k; $kBase[$ksp]=base; $kKind[$ksp]=0; $ksp+=1; return $CALL_PENDING; }
function $split1(f,x,k,base) { const j=f[$BEND_TAIL]; $tailFn=j||f; $tailCount=j?-3:-1; $tailUnary=x; $kFn[$ksp]=k; $kBase[$ksp]=base; $kKind[$ksp]=0; $ksp+=1; return $CALL_PENDING; }
function $frame(t,base) { $kFn[$ksp]=t; $kBase[$ksp]=base; $kKind[$ksp]=1; $ksp+=1; }
let $tailFn, $tailCount=0, $tailUnary, $tailRest;
function tail_many(f,a) { $tailFn=f; $tailCount=-2; $tailRest=a; return $TAIL_PENDING; }
function tail_unary(f,x) { $tailFn=f; $tailCount=-1; $tailUnary=x; return $TAIL_PENDING; }
function tail_named(f,n) { $tailFn=f; $tailCount=n; return $TAIL_PENDING; }
function $run(f, xs, n) { let x=run_loop(f); for (let i=0;i<n;i++) x=run_call1(x,xs[i]); return x; }
function $curried(f, n, g, t, x, r) { const step = (args) => function (...more) { const xs = args.concat(more); if (xs.length < n) return step(xs); for (const i of g) xs[i] = nat_in(xs[i]); for (const i of t) xs[i] = str_in(xs[i]); for (const i of x) xs[i] = Math.fround(xs[i]); return r($run(f, xs, n)); }; return step([]); }
function run_loop(x) { return run_base(x,$ksp,$sp); }
function run_call1(f,a) { const b0=$ksp, s0=$sp; return run_base(f(a),b0,s0); }
function run_base(x,k0,s0) { try { for(;;) { while (x===$TAIL_PENDING) { const f=$tailFn, count=$tailCount; $tailFn=undefined; $tailCount=0; if(count===-1) { const a=$tailUnary; $tailUnary=undefined; x=f(a,$BEND_TAIL); } else x=tail_dispatch(f,count); } if (x===$CALL_PENDING) { const f=$tailFn, count=$tailCount; $tailFn=undefined; $tailCount=0; if(count===1) { const a0=$tailArgs[0]; $tailArgs[0]=undefined; x=f(a0); } else if(count===2) { const a0=$tailArgs[0],a1=$tailArgs[1]; $tailArgs[0]=$tailArgs[1]=undefined; x=f(a0,a1); } else if(count===-1) { const a=$tailUnary; $tailUnary=undefined; x=f(a); } else if(count===-3) { const a=$tailUnary; $tailUnary=undefined; x=f(a,$BEND_TAIL); } else x=tail_dispatch(f,count); continue; } if (x===$LEAVE_PENDING) { let i=$ksp; while(i>k0&&($kKind[i-1]===0||$kFn[i-1]!==$leaveThunk))i-=1; if(i===k0)throw "bend: a region leave reached no private frame"; i-=1; const t=$kFn[i], b=$kBase[i]; $kFn[i]=undefined; $ksp=i; $sp=b; x=t(undefined,b); continue; } if ($ksp===k0) { $sp=s0; return x; } $ksp-=1; const k=$kFn[$ksp], b=$kBase[$ksp], r=$kKind[$ksp]; $kFn[$ksp]=undefined; $sp=b; if(r===1) continue; x=k(x,b); } } catch(e) { $ksp=k0; $sp=s0; $tailFn=undefined; $tailCount=0; throw e; } }
function tail_dispatch(f,count) { switch(count) {
case -2: { const a=$tailRest; $tailRest=undefined; return f(...a); }
case 1: { const a0=$tailArgs[0]; $tailArgs[0]=undefined; return f(a0); }
case 2: { const a0=$tailArgs[0],a1=$tailArgs[1]; $tailArgs[0]=$tailArgs[1]=undefined; return f(a0,a1); }
case 3: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=undefined; return f(a0,a1,a2); }
case 4: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=undefined; return f(a0,a1,a2,a3); }
case 5: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=undefined; return f(a0,a1,a2,a3,a4); }
case 6: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=undefined; return f(a0,a1,a2,a3,a4,a5); }
case 7: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=undefined; return f(a0,a1,a2,a3,a4,a5,a6); }
case 8: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7); }
case 9: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8); }
case 10: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9); }
case 11: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10); }
case 12: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11); }
case 13: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12); }
case 14: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13); }
case 15: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14); }
case 16: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15); }
case 17: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16); }
case 18: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17); }
case 19: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18); }
case 20: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19); }
case 21: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20); }
case 22: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21); }
case 23: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22); }
case 24: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23); }
case 25: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24); }
case 26: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25); }
case 27: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25],a26=$tailArgs[26]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=$tailArgs[26]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26); }
case 28: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25],a26=$tailArgs[26],a27=$tailArgs[27]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=$tailArgs[26]=$tailArgs[27]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27); }
case 29: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25],a26=$tailArgs[26],a27=$tailArgs[27],a28=$tailArgs[28]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=$tailArgs[26]=$tailArgs[27]=$tailArgs[28]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28); }
case 30: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25],a26=$tailArgs[26],a27=$tailArgs[27],a28=$tailArgs[28],a29=$tailArgs[29]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=$tailArgs[26]=$tailArgs[27]=$tailArgs[28]=$tailArgs[29]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29); }
case 31: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25],a26=$tailArgs[26],a27=$tailArgs[27],a28=$tailArgs[28],a29=$tailArgs[29],a30=$tailArgs[30]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=$tailArgs[26]=$tailArgs[27]=$tailArgs[28]=$tailArgs[29]=$tailArgs[30]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30); }
case 32: { const a0=$tailArgs[0],a1=$tailArgs[1],a2=$tailArgs[2],a3=$tailArgs[3],a4=$tailArgs[4],a5=$tailArgs[5],a6=$tailArgs[6],a7=$tailArgs[7],a8=$tailArgs[8],a9=$tailArgs[9],a10=$tailArgs[10],a11=$tailArgs[11],a12=$tailArgs[12],a13=$tailArgs[13],a14=$tailArgs[14],a15=$tailArgs[15],a16=$tailArgs[16],a17=$tailArgs[17],a18=$tailArgs[18],a19=$tailArgs[19],a20=$tailArgs[20],a21=$tailArgs[21],a22=$tailArgs[22],a23=$tailArgs[23],a24=$tailArgs[24],a25=$tailArgs[25],a26=$tailArgs[26],a27=$tailArgs[27],a28=$tailArgs[28],a29=$tailArgs[29],a30=$tailArgs[30],a31=$tailArgs[31]; $tailArgs[0]=$tailArgs[1]=$tailArgs[2]=$tailArgs[3]=$tailArgs[4]=$tailArgs[5]=$tailArgs[6]=$tailArgs[7]=$tailArgs[8]=$tailArgs[9]=$tailArgs[10]=$tailArgs[11]=$tailArgs[12]=$tailArgs[13]=$tailArgs[14]=$tailArgs[15]=$tailArgs[16]=$tailArgs[17]=$tailArgs[18]=$tailArgs[19]=$tailArgs[20]=$tailArgs[21]=$tailArgs[22]=$tailArgs[23]=$tailArgs[24]=$tailArgs[25]=$tailArgs[26]=$tailArgs[27]=$tailArgs[28]=$tailArgs[29]=$tailArgs[30]=$tailArgs[31]=undefined; return f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31); }
default: throw "bend: invalid private tail frame";
} }
function run_force(x,raw,b0,s0) { return raw===$BEND_TAIL?x:run_base(x,b0,s0); }
function run_many(f,a,d=$td) { return d<64?f(...a,d+1):tail_many(f,a); }
function run_tail(f,x) { const j=f[$BEND_TAIL]; return j ? tail_unary(j,x) : f(x); }
function run_clo(j) { j[$BEND_TAIL]=j; return j; }
function nat_chk(x) { if(x>281474976710655) throw "bend: a Nat past the largest immediate 2^48-1"; return x; }
function char_new(c) { return c < 0xD800 || c >= 0xE000 && c <= 0x10FFFF ? String.fromCodePoint(c) : String.fromCharCode(0xDC00, c >>> 22, c >>> 11 & 0x7FF, c & 0x7FF); }
function char_len(s, at=0) { return s[at] === "\uDC00" ? 4 : s.codePointAt(at) > 0xFFFF ? 2 : 1; }
function char_code_at(s, at) { return s[at] === "\uDC00" ? (s.charCodeAt(at+1) << 22 | s.charCodeAt(at+2) << 11 | s.charCodeAt(at+3)) >>> 0 : s.codePointAt(at); }
function char_code(s) { return char_code_at(s, 0); }
function str_out(s) { return s.replace(/\uDC00[^]{3}/gu, "\uFFFD"); }
function str_in(s) { return s.replace(/\p{Cs}/gu, "\uFFFD"); }
function cmp_new(a,b) { return {$:a<b?"LT":a===b?"EQ":"GT"}; }
function word_to_u32(w) { let x=0; for(let i=0;w.$==="WCon";i++,w=w.tail) if(w.head)x|=1<<i; return x>>>0; }
function u32_to_word(x) { let w={$:"WNil"}; for(let i=31;i>=0;i--) w={$:"WCon",head:!!((x>>>i)&1),tail:w}; return w; }
function run_named1(f,a0,d) { return d<64?f(a0,d+1):($tailArgs[0]=a0,tail_named(f,1)); }
function run_named2(f,a0,a1,d) { return d<64?f(a0,a1,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,tail_named(f,2)); }
function run_named3(f,a0,a1,a2,d) { return d<64?f(a0,a1,a2,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,tail_named(f,3)); }
function run_named4(f,a0,a1,a2,a3,d) { return d<64?f(a0,a1,a2,a3,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,tail_named(f,4)); }
function run_named5(f,a0,a1,a2,a3,a4,d) { return d<64?f(a0,a1,a2,a3,a4,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,tail_named(f,5)); }
function run_named6(f,a0,a1,a2,a3,a4,a5,d) { return d<64?f(a0,a1,a2,a3,a4,a5,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,tail_named(f,6)); }
function run_named7(f,a0,a1,a2,a3,a4,a5,a6,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,tail_named(f,7)); }
function run_named8(f,a0,a1,a2,a3,a4,a5,a6,a7,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,tail_named(f,8)); }
function run_named9(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,tail_named(f,9)); }
function run_named10(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,tail_named(f,10)); }
function run_named11(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,tail_named(f,11)); }
function run_named12(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,tail_named(f,12)); }
function run_named13(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,tail_named(f,13)); }
function run_named14(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,tail_named(f,14)); }
function run_named15(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,tail_named(f,15)); }
function run_named16(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,tail_named(f,16)); }
function run_named17(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,tail_named(f,17)); }
function run_named18(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,tail_named(f,18)); }
function run_named19(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,tail_named(f,19)); }
function run_named20(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,tail_named(f,20)); }
function run_named21(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,tail_named(f,21)); }
function run_named22(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,tail_named(f,22)); }
function run_named23(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,tail_named(f,23)); }
function run_named24(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,tail_named(f,24)); }
function run_named25(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,tail_named(f,25)); }
function run_named26(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,tail_named(f,26)); }
function run_named27(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,$tailArgs[26]=a26,tail_named(f,27)); }
function run_named28(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,$tailArgs[26]=a26,$tailArgs[27]=a27,tail_named(f,28)); }
function run_named29(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,$tailArgs[26]=a26,$tailArgs[27]=a27,$tailArgs[28]=a28,tail_named(f,29)); }
function run_named30(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,$tailArgs[26]=a26,$tailArgs[27]=a27,$tailArgs[28]=a28,$tailArgs[29]=a29,tail_named(f,30)); }
function run_named31(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,$tailArgs[26]=a26,$tailArgs[27]=a27,$tailArgs[28]=a28,$tailArgs[29]=a29,$tailArgs[30]=a30,tail_named(f,31)); }
function run_named32(f,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31,d) { return d<64?f(a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31,d+1):($tailArgs[0]=a0,$tailArgs[1]=a1,$tailArgs[2]=a2,$tailArgs[3]=a3,$tailArgs[4]=a4,$tailArgs[5]=a5,$tailArgs[6]=a6,$tailArgs[7]=a7,$tailArgs[8]=a8,$tailArgs[9]=a9,$tailArgs[10]=a10,$tailArgs[11]=a11,$tailArgs[12]=a12,$tailArgs[13]=a13,$tailArgs[14]=a14,$tailArgs[15]=a15,$tailArgs[16]=a16,$tailArgs[17]=a17,$tailArgs[18]=a18,$tailArgs[19]=a19,$tailArgs[20]=a20,$tailArgs[21]=a21,$tailArgs[22]=a22,$tailArgs[23]=a23,$tailArgs[24]=a24,$tailArgs[25]=a25,$tailArgs[26]=a26,$tailArgs[27]=a27,$tailArgs[28]=a28,$tailArgs[29]=a29,$tailArgs[30]=a30,$tailArgs[31]=a31,tail_named(f,32)); }
function $split_enter(k,b) { const i=$ksp++; $kFn[i]=k; $kBase[i]=b; $kKind[i]=0; return i; }
function $split_done(x,i,d) { if(x===$TAIL_PENDING||x===$CALL_PENDING||x===$LEAVE_PENDING||$ksp!==i+1)return x; const k=$kFn[i],b=$kBase[i]; $kFn[i]=undefined; $ksp=i; $sp=b; return k(x,b,d); }
function $split_abort(i,b) { while($ksp>i)$kFn[--$ksp]=undefined; $sp=b; $tailFn=undefined; $tailCount=0; }
function f32_from_bits(x) { return new Float32Array(new Uint32Array([x]).buffer)[0]; }
function f32_bits(x) { return new Uint32Array(new Float32Array([x]).buffer)[0]; }
function tuple(a,b) { return {$:"Tuple",fst:a,snd:b}; }
function f32_show(x) { if(x!==x) return "nan"; if(!Number.isFinite(x)||Object.is(x,-0)) return x<0?"-inf":x===0?"-0":"inf"; let s="x"; for(let p=1;p<=9&&Math.fround(Number(s))!==x;p++) s=String(Number(x.toExponential(p-1))); return s; }
function f32_round(s) { const d=Number(s); const a=Math.abs(d); const f=Math.fround(a); const g=2*a-Math.min(f,2**128); if(g===f||Math.fround(g)!==g||g===Infinity) return Math.sign(d)*f; let k=0; while(a*2**k%1!==0) k+=1; const m=/(\d*)\.?(\d*)(?:e([+-]?\d+))?$/i.exec(s); const n=Number(m[3]??0)-m[2].length; const x=BigInt(m[1]+m[2])*2n**BigInt(k)*10n**BigInt(Math.max(n,0)); const y=BigInt(a*2**k)*10n**BigInt(Math.max(-n,0)); return Math.sign(d)*(x===y||x>y!==g>f?f:g); }
function f32_pow(a,b) { return (a === 1 || a === -1 && Math.abs(b) === Infinity ? 1 : Math.fround(Math.pow(a,b))); }
function f32_read(s) { const re=/^[\t\n\v\f\r ]*[+-]?((\d+(?:\.\d*)?|\.\d+)(e[+-]?\d+)?|inf(inity)?|nan)$/i; const v=f32_round(s.replace(/inf\w*/i,"Infinity")); return re.test(s)?{$:"Some",value:v}:{$:"None"}; }
function nat_divmod(a,b) { return b===0?tuple(0,a):tuple(Math.trunc(a/b),a%b); }
function nat_in(n) { if(!Number.isInteger(n)||n<0||n>9007199254740992)throw "bend: expected a Nat host number: an integer from 0 to 2^53"; return n; }
function array_new(n,v) { if(n>31) throw "bend: an array past the deepest block class 31"; return Array(2 ** n).fill(v); }
function array_node(a,b) { if(a.length!==b.length) throw "bend: runtime fail-stop"; return a.concat(b); }
function $type_native_invoke(f,ps) { let value=f.intrinsic; for(let i=0;i<f.n;i++)if(f.q[i]!==0)value=value($type_runtime_value(ps[i])); return value; }
function $type_runtime_value(value) { const v=$type_force(value); if(!v||v.k!=="V")return v; const c=$PRIMITIVES[v.c]||($FIELDS[v.c]===undefined?v.c:""),xs=v.args; switch(c) { case "Nat.Zero":return 0; case "Nat.Succ":return nat_chk($type_runtime_value(xs[0])+1); case "Bool.False":return false; case "Bool.True":return true; case "String.SNil":return ""; case "String.SCon":return $type_runtime_value(xs[0])+$type_runtime_value(xs[1]); case "Char.Chr":return char_new($type_runtime_value(xs[0])); case "U32.U32":return word_to_u32($type_runtime_value(xs[0])); case "F32.F32":return f32_from_bits(word_to_u32($type_runtime_value(xs[0]))); case "Array.ALeaf":return [$type_runtime_value(xs[0])]; case "Array.ANode":return $type_runtime_value(xs[0]).concat($type_runtime_value(xs[1])); } const fs=$FIELDS[v.c]; if(!fs||fs.length!==xs.length)throw "bend: unresolved metadata constructor"; const args=xs.map((x,i)=>fs[i]===null?null:$type_runtime_value(x)); return $ctr(v.c,args,"",{}); }
function $type_key(k,s,i) { const q=$key(k,s,i||{}); return $TYPE[q]!==undefined||$TYPEF[q]!==undefined?q:k; }
function $type_ctor_key(k,s,i) { const q=$key(k,s,i||{}); return $FIELDS[q]!==undefined?q:k; }
function $type_delay(t,a) { if(t.k)return t; if(t.p!==undefined&&a[a.length-1-t.p]!==undefined)return a[a.length-1-t.p]; return {k:"Thunk",term:t,env:a,depth:a.length,done:false}; }
function $type_force(v) { if(v&&v.k==="Thunk") { if(!v.done) { v.value=$type(v.term,v.env.length===v.depth?v.env:v.env.slice(0,v.depth)); v.done=true; } return v.value; } return v; }
function $type_apply(f,x) { f=$type_force(f); if(f.k==="L") return $type(f.body,f.env.concat([x])); if(f.k==="TF"||f.k==="DF") return $type_named(f.key,f.args.concat([x])); throw "bend: type expression applied a non-function"; }
function $type_named(q,ps) { const f=$TYPEF[q]; if(f) { if(ps.length<f.n)return {k:"TF",key:q,args:ps}; let v=f.intrinsic?$type_native_invoke(f,ps):$type(f.body,ps.length===f.n?ps:ps.slice(0,f.n)); for(let i=f.n;i<ps.length;i++)v=$type_apply(v,ps[i]); if(f.native==="IO")v.name="IO"; return v; } const d=$TYPE[q]; if(!d) throw "bend: unresolved type expression "+q; const p=$PARAMS[q]; if(ps.length<p.n)return {k:"DF",key:q,args:ps}; if(ps.length!==p.n)throw "bend: datatype parameter count mismatch"; if(d.native==="Array") return {k:"A",e:$type_force(ps[0])}; const k=({U32:"U",F32:"F",Nat:"N",Char:"C",String:"S",Eql:"E"})[d.native]; return k?{k}:{k:"D",key:q,name:d.name,native:d.native,arms:d.arms,args:ps}; }
function $type_sugar(t,a) { const h=$type(t.sugar,a),more=t.a.map(x=>$type_delay(x,a)); if(h.k==="TF"||h.k==="DF"||h.k==="D") { const q=h.key,p=$PARAMS[q]; let xs=h.args.concat(more); if(p&&xs.length+p.q===p.n)xs=Array.from({length:p.q},()=>({k:"Q",v:t.f})).concat(xs); if(p&&t.f===2)xs=xs.map((x,i)=>i<p.q?({k:"Q",v:2}):x); return $type_named(q,xs); } let v=h; for(const x of more)v=$type_apply(v,x); return v; }
function $type_pattern(p,v,bindings) { if(p.v) { bindings.push(v); return true; } v=$type_force(v); const q=$type_ctor_key(p.c,p.s,p.i),c=$PRIMITIVES[q]||($FIELDS[q]===undefined?q:""); let fields,complete=false; if(v&&v.k==="V") { if(v.c!==q)return false; fields=v.args; complete=true; } else if(v&&v.$===q) { const names=$FIELDS[q]; if(!names||names.length!==p.fields.length)return false; for(let j=0;j<names.length;j++){if(names[j]===null){bindings.push(null);continue;}if(!$type_pattern(p.fields[j],v[names[j]],bindings))return false;}return true; } else if(c==="Bool.True"&&v===true||c==="Bool.False"&&v===false||c==="Nat.Zero"&&v===0||c==="String.SNil"&&v==="") fields=[]; else if(c==="Nat.Succ"&&typeof v==="number"&&v>0)fields=[v-1]; else if(c==="String.SCon"&&typeof v==="string"&&v.length)fields=[v.slice(0,char_len(v)),v.slice(char_len(v))]; else if(c==="Char.Chr"&&typeof v==="string")fields=[char_code(v)]; else if(c==="U32.U32"&&typeof v==="number")fields=[u32_to_word(v)]; else if(c==="F32.F32"&&typeof v==="number")fields=[u32_to_word(f32_bits(v))]; else if(c==="Array.ALeaf"&&Array.isArray(v)&&v.length===1)fields=[v[0]]; else if(c==="Array.ANode"&&Array.isArray(v)&&v.length!==1)fields=[v.slice(0,v.length>>1),v.slice(v.length>>1)]; else return false; let at=0; for(const field of p.fields) { if(!complete&&field.v&&field.q===0) { bindings.push(null); continue; } if(at>=fields.length||!$type_pattern(field,fields[at++],bindings))return false; } return at===fields.length; }
function $type_bind(patterns,values) { if(patterns.length!==values.length)return null; const bindings=[]; for(let j=0;j<values.length;j++)if(!$type_pattern(patterns[j],values[j],bindings))return null; return bindings; }
function $type(t,a=[]) { if(t===null)return null; if(t===undefined)throw "bend: missing type expression"; if(t.p!==undefined) { const v=$type_force(a[a.length-1-t.p]); if(v===undefined||v===null)throw "bend: unavailable type-expression binder"; return v; } if(t.k)return $type_force(t); if(t.fail)throw t.fail; if(t.kind!==undefined)return {k:"K",q:$type(t.kind,a)}; if(t.min!==undefined)return {k:"Q",v:Math.min($type(t.min,a).v,$type(t.right,a).v)}; if(t.all!==undefined)return {k:"Fn",q:t.q,domain:$type(t.all,a),body:t.body,env:a}; if(t.lam!==undefined)return {k:"L",body:t.lam,env:a}; if(t.app!==undefined)return $type_apply($type(t.app,a),$type_delay(t.arg,a)); if(t.sub!==undefined) { const env=a.slice(); env.splice(env.length-t.sub,0,$type_delay(t.value,a)); return $type(t.body,env); } if(t.let!==undefined)return $type(t.body,a.concat(t.let.map(x=>$type_delay(x,a)))); if(t.local!==undefined) { const bs=$type_bind(t.pat,t.local.map(x=>$type_delay(x,a))); if(bs===null)throw "bend: type expression local pattern failed"; return $type(t.body,a.concat(bs)); } if(t.bind!==undefined)return $type(t.body,a.concat([$type_delay(t.bind,a)])); if(t.match!==undefined) { const vs=t.match.map(x=>$type_delay(x,a)); for(const c of t.cases) { const bs=$type_bind(c.pat,vs); if(bs!==null)return $type(c.body,a.concat(bs)); } throw "bend: type expression match failed"; } if(t.c!==undefined)return {k:"V",c:$type_ctor_key(t.c,t.s,t.i),args:t.a.map(x=>$type_delay(x,a))}; if(t.sugar!==undefined)return $type_sugar(t,a); if(t.f) { const q=$type_key(t.r,t.s,t.i),p=$PARAMS[q]; if(!p&&t.f===2)return $type(t.h,a); let xs=t.a||[]; if(p&&xs.length+p.q===p.n)xs=Array.from({length:p.q},()=>({k:"Q",v:1})).concat(xs); if(p&&t.f===2)xs=xs.map((x,i)=>i<p.q?({k:"Q",v:2}):x); return $type_named(q,xs.map(x=>$type_delay(x,a))); } if(t.r!==undefined)return $type_named($type_key(t.r,t.s,t.i),(t.a||[]).map(x=>$type_delay(x,a))); throw "bend: unsupported type-expression descriptor"; }
function $show_chr(s,q) { const c=char_code(s), k=({10:"n",9:"t",13:"r",0:"0",92:"\\"})[c]??(s===q&&q); return k?"\\"+k:c<32||c===127||s.length>2||(c>=0xD800&&c<0xE000)?"\\u{"+c.toString(16)+"}":s; }
function $show_list(t,x) { const xs=[]; while(x&&x.$==="Con") { const fs=t.arms.Con; if(!fs||!Object.hasOwn(x,"head")||!Object.hasOwn(x,"tail")) throw "bend: malformed List.Con"; xs.push($show_value($type(fs.types[0],t.args),x.head,0)); const next=$type(fs.types[1],t.args.concat([x.head])); x=x.tail; t=next; } if(!x||x.$!=="Nil") throw "bend: malformed List.Nil"; return "["+xs.join(", ")+"]"; }
function $show_fields(t,x,chain) { const fs=t.arms[x.$]; if(!fs) throw "bend: constructor absent from result datatype"; const out=[],env=t.args.slice(); let at=0; for(let j=0;j<fs.types.length;j++) { if(fs.q[j]===0) { env.push(null); continue; } const name=fs.fields[j]; if(!Object.hasOwn(x,name))throw "bend: constructor field count mismatch"; const v=x[name]; at++; out.push($show_value($type(fs.types[j],env),v,chain&&at===2?"(":0)); env.push(v); } return out.join(", "); }
function $show_value(t,x,chain) { if(!t) return String(x); if(t.k==="U") return String(x); if(t.k==="F") { const s=f32_show(x); return s.replace(/^-?\d+(?=e|$)/i,"$&.0"); } if(t.k==="N") return x+"n"; if(t.k==="C") return "'"+$show_chr(x,"'")+"'"; if(t.k==="S") return "\""+x.replace(/\uDC00[^]{3}|[^]/gu,c=>$show_chr(c,"\""))+"\""; if(t.k==="E") return "{==}"; if(t.k==="A") return "["+x.map(v=>$show_value(t.e,v,0)).join(", ")+"]"; if(typeof x==="boolean") return x?"True{}":"False{}"; if(!x||typeof x!=="object"||!x.$) return String(x); if(t.native==="List") return $show_list(t,x); if(t.native==="Sigma"&&x.$==="Tuple") { const c=chain==="("; return (c?"":"(")+$show_fields(t,x,true)+(c?"":")"); } if(t.k!=="D") throw "bend: expected a datatype result"; return x.$+"{"+$show_fields(t,x,false)+"}"; }
let cli_args = [];
function cli(argv) {
  let rts = false;
  cli_args.push(argv[0]);
  for (let i = 1; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--RTS") {
      cli_args.push(...argv.slice(i + 1));
      break;
    } else if (a === "+RTS" || a === "-RTS") {
      rts = a === "+RTS";
    } else if (!rts) {
      cli_args.push(a);
    } else if (a === "--help" || a === "--gpu-build") {
      io_out(1, io_bytes(a === "--help" ? "usage: " + argv[0] + "\n" : ""));
      process.exit(0);
    } else {
      const re = a === "--threads" ? /^0*[1-9]\d*$/ : a === "--gpu"
        ? /^(on|off|(\d*\.?\d*)([GM])B)$/ : undefined;
      const m = re?.exec(argv[++i]);
      if (!m || m[3]
        && !(m[2] * (m[3] === "G" ? 2 ** 30 : 2 ** 20) >= 16384)) {
        io_errs("bend: " + (re === undefined ? "unknown runtime option " + a
          : a === "--gpu" ? "expected on, off or a size like 4GB after --gpu"
          : "expected a thread count of 1 or more after --threads"));
        process.exit(1);
      }
    }
  }
}
function io_out(fd,data) { const fs=require("fs"), b=Buffer.from(data); let at=0; while(at<b.length){ try{ at+=fs.writeSync(fd,b,at,b.length-at); } catch(e){ if(e.code==="EAGAIN"||e.code==="EINTR")continue; if(e.code==="EPIPE"){process.on("SIGPIPE",()=>{}).removeAllListeners("SIGPIPE").kill(process.pid,"SIGPIPE");} try{fs.writeSync(2,"bend: a short write on a standard stream\n");}catch(o){} process.exit(1);} } }
function io_errs(message) { io_out(2,io_bytes(message+"\n")); }
function io_bytes(text) { return new TextEncoder().encode(str_out(text)); }
function io_text(b,n) { return new TextDecoder("utf-8",{ignoreBOM:true}).decode(b.subarray(0,n)); }
function io_list(b,n) { let xs={$:"Nil"}; while(n>0){ xs={$:"Con",head:b[--n],tail:xs}; } return xs; }
function io_unlist(xs) { const b=[]; for(;xs.$==="Con";xs=xs.tail){ b.push(xs.head); } return b.some(x=>x>255)?null:Uint8Array.from(b); }
function io_addr(host,port) { const part=host.split("."); const deci=p=>/^(0|[1-9]\d{0,2})$/.test(p)&&Number(p)<256; if(port>65535||part.length!==4||!part.every(deci))return null; const b=new Uint8Array(16); const head=io_sys().mac?[16,2]:[2,0]; b.set([...head,port>>8,port&255,...part.map(Number)]); return b; }
function io_tup(...xs) { return xs.reduceRight((snd,fst)=>({$:"Tuple",fst,snd})); }
function io_done(value) { return {$:"Done",value}; }
function io_strerror(code) { try{ return String(io_sys().strerror(code)); } catch(o){ return "errno "+code; } }
function io_fail(code,...rest) { const err=io_tup(code>>>0,io_strerror(code)); return {$:"Fail",error:io_tup(err,...rest)}; }
function io_until(ms) { return performance.now()+Number(ms); }
function io_late(at) { return at!==undefined&&performance.now()>=at; }
function io_ready(at,r) { return at===undefined?r:{$:"Ready",value:r}; }
function io_sys() { if(globalThis.BEND_SYS===undefined){ const ffi=require("bun:ffi"), mac=process.platform==="darwin", err=mac?"__error":"__errno_location", sel=mac?"select$DARWIN_EXTSN":"select", T={i:"i32",u:"u32",U:"u64",I:"i64",p:"ptr",c:"cstring"}, vari=mac&&process.arch==="arm64", lib=ffi.dlopen(mac?"libSystem.dylib":"libc.so.6",Object.fromEntries(("socket:iii>i bind:ipu>i listen:ii>i connect:ipu>i accept:ipp>i send:ipUi>I recv:ipUi>I read:ipU>I pread:ipUI>I sendto:ipUipu>I recvfrom:ipUipp>I close:i>i setsockopt:iiipu>i "+sel+":ipppp>i"+(vari?" fcntl:iiiiiiiii>i":" fcntl:iii>i")+" getsockopt:iiipp>i strerror:i>c "+err+":>p").split(" ").map(s=>{const [name,args,ret]=s.split(/[:>]/);return [name,{args:[...args].map(a=>T[a]),returns:T[ret]}]}))).symbols; const fcntl=(fd,cmd,arg)=>vari?lib.fcntl(fd,cmd,0,0,0,0,0,0,arg):lib.fcntl(fd,cmd,arg); globalThis.BEND_SYS={...lib,fcntl,select:lib[sel],ptr:ffi.ptr,mac,errno:()=>ffi.read.i32(lib[err](),0)}; } return globalThis.BEND_SYS; }
function io_push(fun,arg,fresh) { const io=globalThis.BEND_IO; io.runs.push({fun,arg}); io.live+=fresh?1:0; }
function io_park_on(fd,out,k,more,at) { const ws=globalThis.BEND_IO.waits; const i=ws.findLastIndex(w=>(w.at??Infinity)<=(at??Infinity)); ws.splice(i+1,0,{fd,out,k,more,at}); }
function io_wait(io,block) { const soon=io.waits[0]?.at??Infinity; const ms=!block?0:soon===Infinity?-1:Math.max(0,Math.ceil(soon-performance.now())); const fds=io.waits.filter(w=>w.fd!==undefined); const top=fds.reduce((m,w)=>Math.max(m,w.fd),0); const len=(top>>6<<3)+8; const set=new Uint8Array(2*len); const at=w=>(w.out?len:0)+(w.fd>>3); for(const w of fds)set[at(w)]|=1<<(w.fd&7); const tv=new BigInt64Array([BigInt(ms/1000|0),BigInt(ms%1000*1000)]); const sys=io_sys(); if(sys.select(top+1,sys.ptr(set),sys.ptr(set,len),null,ms<0?null:sys.ptr(tv))<0){ if(sys.errno()!==4){ throw "bend: the poller failed"; } set.fill(0); } const now=performance.now(); const due=w=>w.at<=now||w.fd!==undefined&&set[at(w)]&1<<(w.fd&7); const todo=io.waits; io.waits=todo.filter(w=>!due(w)); for(const w of todo.filter(due)){ const x=w.more(); if(x!==undefined)io_push(w.k,x,false); } }
function io_run(m) { const io={runs:[],live:0,waits:[]}; globalThis.BEND_IO=io; try{ io_push(run_loop(m()),x=>({$:"Emit",value:x}),true); let look=0; for(let n=0;;n+=1){ if(io.runs.length===0){ if(io.live===0)return 0; if(io.waits.length===0){ io_errs("bend: deadlock: every computation waits on a channel"); return 1; } io_wait(io,true); continue; } if((n&63)===0&&io.waits.length>0){ const now=performance.now(); if(now>=look||io.waits[0].at<=now){ look=now+10; io_wait(io,false); } } const s=io.runs.shift(); let op=s.fun(s.arg); while(op!==undefined){ if(op.$==="Emit"){ io.live-=1; break; } if(op.$==="Halt"||op.$==="Exit"){ if(op.$==="Halt")io_errs(op.message); if(op.code>255){ io_errs("bend: exit code must be in 0..255"); return 1; } return op.code; } const run=$0eff[op.$]; if(run===undefined){ throw "bend: no effect registers "+op.$; } const x=run(...op.args,op.kont); if(x===undefined)break; op=op.kont(x); } } }catch(e){ throw e instanceof RangeError?"bend: memory fault (machine stack overflow?)":e; } }
function io_exit(main,type) { try{ if(type&&type.name==="IO")return io_run(main); io_out(1,io_bytes($show_value(type,run_loop(main()),0)+"\n")); return 0; }catch(e){ io_errs(String(e)); return 1; } }
function array_swap(a,i,v) { const at=i%a.length, old=a[at]; a[at]=v; return tuple(a,old); }
function array_rmw(a,i,f) { const at=i%a.length, old=a[at]; a[at]=f(old); return tuple(a,old); }
const $0eff=Object.create(null);
function io_emit(value) { return {$:"Emit",value}; }
function io_eff(k,run) { if(arguments.length>2)throw new Error("bend: "+k+" takes no need: an effect that waits parks itself"); if(k in $0eff)throw new Error("bend: two effects register "+k); $0eff[k]=run; }
function $key(k,s,a) { let p=null; for (const alias of Object.keys(a)) if(k.startsWith(alias+".") && (p===null || alias.length>p.length)) p=alias; const n=p===null?undefined:a[p]; return n===undefined?(s?s+"."+k:k):(n?n+".":"")+k.slice(p.length+1); }
function $resolve(k,s,a) { const q=$key(k,s,a); return $D[Object.hasOwn($D,q)?q:k]; }
const $FIELDS=Object.create(null), $PRIMITIVES=Object.create(null), $TYPE=Object.create(null), $TYPEF=Object.create(null), $PARAMS=Object.create(null);
function $ctr(k,x,s,a) { const q=$key(k,s,a), key=Object.hasOwn($FIELDS,q)?q:k, fs=$FIELDS[key]; if(!fs||fs.length!==x.length)throw "bend: unresolved constructor layout"; const v={$:key}; for(let i=0;i<fs.length;i++){const f=fs[i];if(f!==null){if(f==="__proto__")Object.defineProperty(v,f,{value:x[i],enumerable:true,writable:true,configurable:true});else v[f]=x[i];}} return v; }
function $project(v,k,i,s,a) { const q=$key(k,s,a),fs=$FIELDS[q]||$FIELDS[k]; if(!fs)throw "bend: unresolved constructor layout"; for(const f of fs)if(f!==null&&i--===0)return v[f]; throw "bend: constructor field count mismatch"; }
const $p_u32_add=(a,b)=>((a+b)>>>0);
const $p_u32_sub=(a,b)=>((a-b)>>>0);
const $p_u32_mul=(a,b)=>(Math.imul(a,b)>>>0);
const $p_u32_div=(a,b)=>(b===0?0:(a/b)>>>0);
const $p_nat_add=(a,b)=>nat_chk(a+b);
const $p_nat_sub=(a,b)=>(a<b?0:a-b);
const $p_nat_mul=(a,b)=>nat_chk(a*b);
const $p_nat_cmp=(a,b)=>cmp_new(a,b);
const $p_nat_min=(a,b)=>(a<b?a:b);
const $p_nat_max=(a,b)=>(a>b?a:b);
const $p_string_append=(a,b)=>a+b;
const $p_bool_or=(a,b)=>a||b;
const $p_bool_xor=(a,b)=>a!==b;
const $p_u32_is_zero=(a)=>a===0;
const $p_f32_asin=(a)=>Math.fround(Math.asin(a));
const $p_f32_acos=(a)=>Math.fround(Math.acos(a));
const $p_f32_atan=(a)=>Math.fround(Math.atan(a));
const $p_f32_sinh=(a)=>Math.fround(Math.sinh(a));
const $p_f32_cosh=(a)=>Math.fround(Math.cosh(a));
const $p_f32_tanh=(a)=>Math.fround(Math.tanh(a));
const $p_u32_mod=(a,b)=>(b===0?a:a%b);
const $p_u32_and=(a,b)=>((a&b)>>>0);
const $p_u32_or=(a,b)=>((a|b)>>>0);
const $p_u32_xor=(a,b)=>((a^b)>>>0);
const $p_u32_is_eq=(a,b)=>a===b;
const $p_u32_is_ne=(a,b)=>a!==b;
const $p_u32_is_lt=(a,b)=>a<b;
const $p_u32_is_le=(a,b)=>a<=b;
const $p_u32_is_gt=(a,b)=>a>b;
const $p_u32_is_ge=(a,b)=>a>=b;
const $p_u32_inc=(a)=>(a+1)>>>0;
const $p_u32_not=(a)=>(~a)>>>0;
const $p_u32_shl=(a)=>(a<<1)>>>0;
const $p_u32_shr=(a)=>a>>>1;
const $p_u32_shln=(a,b)=>b>=32?0:(a<<b)>>>0;
const $p_u32_shrn=(a,b)=>b>=32?0:a>>>b;
const $p_u32_cmp=(a,b)=>cmp_new(a,b);
const $p_u32_to_nat=(a)=>a;
const $p_u32_from_nat=(a)=>a>>>0;
const $p_f32_add=(a,b)=>Math.fround(a+b);
const $p_f32_sub=(a,b)=>Math.fround(a-b);
const $p_f32_mul=(a,b)=>Math.fround(a*b);
const $p_f32_div=(a,b)=>Math.fround(a/b);
const $p_f32_mod=(a,b)=>Math.fround(a%b);
const $p_f32_neg=(a)=>-a;
const $p_f32_sqrt=(a)=>Math.fround(Math.sqrt(a));
const $p_f32_abs=(a)=>Math.fround(Math.abs(a));
const $p_f32_to_u32=(a)=>(a>=1&&a<4294967296?Math.floor(a):0);
const $p_f32_bits=(a)=>f32_bits(a);
const $p_f32_show=(a)=>f32_show(a);
const $p_f32_read=(a)=>f32_read(a);
const $p_f32_is_eq=(a,b)=>a===b;
const $p_f32_is_ne=(a,b)=>a!==b;
const $p_f32_is_lt=(a,b)=>a<b;
const $p_f32_is_le=(a,b)=>a<=b;
const $p_f32_is_gt=(a,b)=>a>b;
const $p_f32_is_ge=(a,b)=>a>=b;
const $p_f32_pow=(a,b)=>f32_pow(a,b);
const $p_f32_atan2=(a,b)=>Math.fround(Math.atan2(a,b));
const $p_f32_exp=(a)=>Math.fround(Math.exp(a));
const $p_f32_log=(a)=>Math.fround(Math.log(a));
const $p_f32_log2=(a)=>Math.fround(Math.log2(a));
const $p_f32_log10=(a)=>Math.fround(Math.log10(a));
const $p_f32_sin=(a)=>Math.fround(Math.sin(a));
const $p_f32_cos=(a)=>Math.fround(Math.cos(a));
const $p_f32_tan=(a)=>Math.fround(Math.tan(a));
const $p_f32_floor=(a)=>Math.fround(Math.floor(a));
const $p_f32_ceil=(a)=>Math.fround(Math.ceil(a));
const $p_f32_trunc=(a)=>Math.fround(Math.trunc(a));
const $p_f32_to_nat=(a)=>Math.floor(a);
const $p_u32_to_f32=(a)=>Math.fround(a);
const $p_nat_double=(a)=>nat_chk(a+a);
const $p_nat_is_lt=(a,b)=>a<b;
const $p_nat_divmod=(a,b)=>nat_divmod(a,b);
const $p_string_eq=(a,b)=>a===b;
const $p_map_bit=(key,position)=>{const character=Math.floor(position/33);if(character>=key.length)return tuple(key,false);const offset=position%33;let at=0;for(let i=0;i<character&&at<key.length;i++)at+=char_len(key,at);return tuple(key,at<key.length&&(offset===0||((char_code_at(key,at)>>>(32-offset))&1)!==0));};
const $p_string_cmp=(a,b)=>{let i=0,j=0,order=0;if(a!==b){while(i<a.length&&j<b.length){const x=char_code_at(a,i),y=char_code_at(b,j);if(x!==y){order=x<y?-1:1;break;}i+=char_len(a,i);j+=char_len(b,j);}if(order===0)order=i<a.length?1:j<b.length?-1:0;}return tuple(tuple(a,b),cmp_new(order,0));};
const $p_string_to_list=(text)=>{let tail={$:"Nil"};for(let i=text.length;i>0;){let n=1;if(i>=4&&text.charCodeAt(i-4)===0xDC00)n=4;else if(i>=2&&text.charCodeAt(i-1)>=0xDC00&&text.charCodeAt(i-1)<=0xDFFF&&text.charCodeAt(i-2)>=0xD800&&text.charCodeAt(i-2)<=0xDBFF)n=2;tail={$:"Con",head:text.slice(i-n,i),tail};i-=n;}return tail;};
const $p_string_length=(a)=>[...str_out(a)].length;
const $p_array_new=(a,b)=>array_new(a,b);
const $p_array_set=(a,i,v)=>(a[i%a.length]=v,a);
const $p_array_get=(a,i)=>tuple(a,a[i%a.length]);
const $p_array_swap=(a,i,v)=>array_swap(a,i,v);
const $p_array_atomic_add=(a,i,v)=>array_rmw(a,i,(o)=>((o+v)>>>0));
const $p_array_atomic_min=(a,i,v)=>array_rmw(a,i,(o)=>Math.min(o,v));
const $p_array_atomic_max=(a,i,v)=>array_rmw(a,i,(o)=>Math.max(o,v));
const $p_array_atomic_and=(a,i,v)=>array_rmw(a,i,(o)=>((o&v)>>>0));
const $p_array_atomic_or=(a,i,v)=>array_rmw(a,i,(o)=>((o|v)>>>0));
const $p_array_atomic_xor=(a,i,v)=>array_rmw(a,i,(o)=>((o^v)>>>0));
const $p_array_atomic_exch=(a,i,v)=>array_rmw(a,i,(o)=>v);
const $p_array_atomic_cas=(a,i,x,v)=>array_rmw(a,i,(o)=>(o===x?v:o));
const $p_array_atomic_fadd=(a,i,v)=>array_rmw(a,i,(o)=>Math.fround(o+v));
const $p_array_size=(a)=>tuple(a,a.length);
const $p_array_clone=(a)=>tuple(a,a.slice());
const $p_nat_predecessor=(a)=>a-1;
const $p_nat_successor=(a)=>nat_chk(a+1);
const $p_char_new=(a)=>char_new(a);
const $p_char_code=(a)=>char_code(a);
const $p_string_head=(a)=>a.slice(0,char_len(a));
const $p_string_tail=(a)=>a.slice(char_len(a));
const $p_word_to_u32=(a)=>word_to_u32(a);
const $p_u32_to_word=(a)=>u32_to_word(a);
const $p_f32_from_bits=(a)=>f32_from_bits(a);
const $p_f32_from_word=(a)=>f32_from_bits(word_to_u32(a));
const $p_f32_to_word=(a)=>u32_to_word(f32_bits(a));
const $p_array_leaf=(a)=>[a];
const $p_array_node=(a,b)=>array_node(a,b);
const $p_array_leaf_value=(a)=>a[0];
const $p_array_left=(a)=>a.slice(0,a.length>>1);
const $p_array_right=(a)=>a.slice(a.length>>1);
const $p_is_array_leaf=(a)=>a.length===1;
const $p_is_array_node=(a)=>a.length!==1;
const $p_is_nat_zero=(a)=>a===0;
const $p_is_nat_successor=(a)=>a>0;
const $p_is_string_empty=(a)=>a==="";
const $p_is_string_nonempty=(a)=>a!=="";
const $p_is_true=(a)=>a===true;
const $p_is_false=(a)=>a===false;
const $p_same_value=(a,b)=>a===b;
const $p_float_bits_equal=(a,b)=>f32_bits(a)===b;
const $p_map_find=(map,key)=>{let node=map,at=0,ci=0;for(;;){const tag=node?.$;if(tag==="MLeaf"){const k=node.key,v=node.val;return key===k?{$:"Some","value":v}:{$:"None"};}if(tag==="MTip"){return {$:"None"};}if(tag!=="MNode"){throw "bend: native Map.find reached a node that is not a Map constructor";}const pos=node.pos,lo=node.lo,hi=node.hi,want=Math.floor(pos/33);if(want<ci){at=0;ci=0;}while(ci<want&&at<key.length){at+=char_len(key,at);ci+=1;}node=(at<key.length&&(pos%33===0||((char_code_at(key,at)>>>(32-pos%33))&1)!==0))?hi:lo;}};
$FIELDS["Unit"]=[];
$PRIMITIVES["Unit"]="Unit.Unit";
$FIELDS["False"]=[];
$PRIMITIVES["False"]="Bool.False";
$FIELDS["True"]=[];
$PRIMITIVES["True"]="Bool.True";
$FIELDS["LT"]=[];
$PRIMITIVES["LT"]="Cmp.LT";
$FIELDS["EQ"]=[];
$PRIMITIVES["EQ"]="Cmp.EQ";
$FIELDS["GT"]=[];
$PRIMITIVES["GT"]="Cmp.GT";
$FIELDS["Inl"]=["value"];
$PRIMITIVES["Inl"]="Either.Inl";
$FIELDS["Inr"]=["value"];
$PRIMITIVES["Inr"]="Either.Inr";
$FIELDS["Tuple"]=["fst","snd"];
$PRIMITIVES["Tuple"]="Sigma.Tuple";
$FIELDS["Zero"]=[];
$PRIMITIVES["Zero"]="Nat.Zero";
$FIELDS["Succ"]=["pred"];
$PRIMITIVES["Succ"]="Nat.Succ";
$FIELDS["None"]=[];
$PRIMITIVES["None"]="Maybe.None";
$FIELDS["Some"]=["value"];
$PRIMITIVES["Some"]="Maybe.Some";
$FIELDS["Fail"]=["error"];
$PRIMITIVES["Fail"]="Result.Fail";
$FIELDS["Done"]=["value"];
$PRIMITIVES["Done"]="Result.Done";
$FIELDS["Ready"]=["value"];
$PRIMITIVES["Ready"]="Poll.Ready";
$FIELDS["Wait"]=["rest"];
$PRIMITIVES["Wait"]="Poll.Wait";
$FIELDS["Nil"]=[];
$PRIMITIVES["Nil"]="List.Nil";
$FIELDS["Con"]=["head","tail"];
$PRIMITIVES["Con"]="List.Con";
$FIELDS["WNil"]=[];
$PRIMITIVES["WNil"]="Word.Nil.WNil";
$FIELDS["WCon"]=["head","tail"];
$PRIMITIVES["WCon"]="Word.Con.WCon";
$FIELDS["U32"]=["data"];
$PRIMITIVES["U32"]="U32.U32";
$FIELDS["F32"]=["data"];
$PRIMITIVES["F32"]="F32.F32";
$FIELDS["Chr"]=["code"];
$PRIMITIVES["Chr"]="Char.Chr";
$FIELDS["SNil"]=[];
$PRIMITIVES["SNil"]="String.SNil";
$FIELDS["SCon"]=["head","tail"];
$PRIMITIVES["SCon"]="String.SCon";
$FIELDS["ALeaf"]=["value"];
$PRIMITIVES["ALeaf"]="Array.ALeaf";
$FIELDS["ANode"]=["xs","ys"];
$PRIMITIVES["ANode"]="Array.ANode";
$FIELDS["Pix"]=["color"];
$PRIMITIVES["Pix"]="Image.Pix";
$FIELDS["Qua"]=["tl","tr","bl","br"];
$PRIMITIVES["Qua"]="Image.Qua";
$FIELDS["Key"]=["code","down"];
$PRIMITIVES["Key"]="Event.Key";
$FIELDS["Text"]=["text"];
$PRIMITIVES["Text"]="Event.Text";
$FIELDS["Mouse"]=["x","y","button","down"];
$PRIMITIVES["Mouse"]="Event.Mouse";
$FIELDS["Move"]=["x","y"];
$PRIMITIVES["Move"]="Event.Move";
$FIELDS["Look"]=["dx","dy"];
$PRIMITIVES["Look"]="Event.Look";
$FIELDS["Scroll"]=["x","y","dx","dy"];
$PRIMITIVES["Scroll"]="Event.Scroll";
$FIELDS["Close"]=[];
$PRIMITIVES["Close"]="Event.Close";
$FIELDS["MTip"]=[];
$PRIMITIVES["MTip"]="Map.MTip";
$FIELDS["MLeaf"]=["key","val"];
$PRIMITIVES["MLeaf"]="Map.MLeaf";
$FIELDS["MNode"]=["pos","lo","hi"];
$PRIMITIVES["MNode"]="Map.MNode";
$FIELDS["Emit"]=["value"];
$PRIMITIVES["Emit"]="IO.OP.Emit";
$FIELDS["Halt"]=["code","message"];
$PRIMITIVES["Halt"]="IO.OP.Halt";
$FIELDS["Exit"]=["code"];
$PRIMITIVES["Exit"]="IO.OP.Exit";
$FIELDS["App"]=["view","tick"];
$PRIMITIVES["App"]="App.App";
$PARAMS["Empty"]={q:0,n:0};
$TYPE["Empty"]={name:"Empty",native:"Empty",arms:{}};
$PARAMS["Unit"]={q:0,n:0};
$TYPE["Unit"]={name:"Unit",native:"Unit",arms:{["Unit"]:{types:[],q:[],fields:[]}}};
$PARAMS["Bool"]={q:0,n:0};
$TYPE["Bool"]={name:"Bool",native:"Bool",arms:{["False"]:{types:[],q:[],fields:[]},["True"]:{types:[],q:[],fields:[]}}};
$PARAMS["Cmp"]={q:0,n:0};
$TYPE["Cmp"]={name:"Cmp",native:"Cmp",arms:{["LT"]:{types:[],q:[],fields:[]},["EQ"]:{types:[],q:[],fields:[]},["GT"]:{types:[],q:[],fields:[]}}};
$PARAMS["Either"]={q:2,n:4};
$TYPE["Either"]={name:"Either",native:"Either",arms:{["Inl"]:{types:[({p:1})],q:[1],fields:["value"]},["Inr"]:{types:[({p:0})],q:[1],fields:["value"]}}};
$PARAMS["Sigma"]={q:2,n:4};
$TYPE["Sigma"]={name:"Sigma",native:"Sigma",arms:{["Tuple"]:{types:[({p:1}),({app:({p:1}),arg:({p:0})})],q:[1,1],fields:["fst","snd"]}}};
$PARAMS["Nat"]={q:0,n:0};
$TYPE["Nat"]={name:"Nat",native:"Nat",arms:{["Zero"]:{types:[],q:[],fields:[]},["Succ"]:{types:[({r:"Nat",a:[],s:"",i:{}})],q:[1],fields:["pred"]}}};
$PARAMS["Maybe"]={q:1,n:2};
$TYPE["Maybe"]={name:"Maybe",native:"Maybe",arms:{["None"]:{types:[],q:[],fields:[]},["Some"]:{types:[({p:0})],q:[1],fields:["value"]}}};
$PARAMS["Result"]={q:2,n:4};
$TYPE["Result"]={name:"Result",native:"Result",arms:{["Fail"]:{types:[({p:1})],q:[1],fields:["error"]},["Done"]:{types:[({p:0})],q:[1],fields:["value"]}}};
$PARAMS["Poll"]={q:2,n:4};
$TYPE["Poll"]={name:"Poll",native:"Poll",arms:{["Ready"]:{types:[({p:1})],q:[1],fields:["value"]},["Wait"]:{types:[({p:0})],q:[1],fields:["rest"]}}};
$PARAMS["List"]={q:1,n:2};
$TYPE["List"]={name:"List",native:"List",arms:{["Nil"]:{types:[],q:[],fields:[]},["Con"]:{types:[({p:0}),({r:"List",h:({r:"List",a:[],s:"",i:{}}),a:[({p:2}),({p:1})],s:"",i:{},f:1})],q:[1,1],fields:["head","tail"]}}};
$PARAMS["Word.Nil"]={q:0,n:0};
$TYPE["Word.Nil"]={name:"Word.Nil",native:"Word.Nil",arms:{["WNil"]:{types:[],q:[],fields:[]}}};
$PARAMS["Word.Con"]={q:0,n:1};
$TYPE["Word.Con"]={name:"Word.Con",native:"Word.Con",arms:{["WCon"]:{types:[({r:"Bool",a:[],s:"",i:{}}),({r:"Word",a:[({p:1})],s:"",i:{}})],q:[1,1],fields:["head","tail"]}}};
$PARAMS["U32"]={q:0,n:0};
$TYPE["U32"]={name:"U32",native:"U32",arms:{["U32"]:{types:[({r:"Word",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Zero",a:[],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],q:[1],fields:["data"]}}};
$PARAMS["F32"]={q:0,n:0};
$TYPE["F32"]={name:"F32",native:"F32",arms:{["F32"]:{types:[({r:"Word",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Succ",a:[({c:"Zero",a:[],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],s:"",i:{}})],q:[1],fields:["data"]}}};
$PARAMS["Char"]={q:0,n:0};
$TYPE["Char"]={name:"Char",native:"Char",arms:{["Chr"]:{types:[({r:"U32",a:[],s:"",i:{}})],q:[1],fields:["code"]}}};
$PARAMS["String"]={q:0,n:0};
$TYPE["String"]={name:"String",native:"String",arms:{["SNil"]:{types:[],q:[],fields:[]},["SCon"]:{types:[({r:"Char",a:[],s:"",i:{}}),({r:"String",a:[],s:"",i:{}})],q:[1,1],fields:["head","tail"]}}};
$PARAMS["Array"]={q:0,n:1};
$TYPE["Array"]={name:"Array",native:"Array",arms:{["ALeaf"]:{types:[({p:0})],q:[1],fields:["value"]},["ANode"]:{types:[({r:"Array",h:({r:"Array",a:[],s:"",i:{}}),a:[({p:0})],s:"",i:{},f:1}),({r:"Array",h:({r:"Array",a:[],s:"",i:{}}),a:[({p:1})],s:"",i:{},f:1})],q:[1,1],fields:["xs","ys"]}}};
$PARAMS["Image"]={q:0,n:0};
$TYPE["Image"]={name:"Image",native:"Image",arms:{["Pix"]:{types:[({r:"U32",a:[],s:"",i:{}})],q:[1],fields:["color"]},["Qua"]:{types:[({r:"Image",a:[],s:"",i:{}}),({r:"Image",a:[],s:"",i:{}}),({r:"Image",a:[],s:"",i:{}}),({r:"Image",a:[],s:"",i:{}})],q:[1,1,1,1],fields:["tl","tr","bl","br"]}}};
$PARAMS["Event"]={q:0,n:0};
$TYPE["Event"]={name:"Event",native:"Event",arms:{["Key"]:{types:[({r:"U32",a:[],s:"",i:{}}),({r:"Bool",a:[],s:"",i:{}})],q:[1,1],fields:["code","down"]},["Text"]:{types:[({r:"String",a:[],s:"",i:{}})],q:[1],fields:["text"]},["Mouse"]:{types:[({r:"U32",a:[],s:"",i:{}}),({r:"U32",a:[],s:"",i:{}}),({r:"U32",a:[],s:"",i:{}}),({r:"Bool",a:[],s:"",i:{}})],q:[1,1,1,1],fields:["x","y","button","down"]},["Move"]:{types:[({r:"U32",a:[],s:"",i:{}}),({r:"U32",a:[],s:"",i:{}})],q:[1,1],fields:["x","y"]},["Look"]:{types:[({r:"F32",a:[],s:"",i:{}}),({r:"F32",a:[],s:"",i:{}})],q:[1,1],fields:["dx","dy"]},["Scroll"]:{types:[({r:"U32",a:[],s:"",i:{}}),({r:"U32",a:[],s:"",i:{}}),({r:"F32",a:[],s:"",i:{}}),({r:"F32",a:[],s:"",i:{}})],q:[1,1,1,1],fields:["x","y","dx","dy"]},["Close"]:{types:[],q:[],fields:[]}}};
$PARAMS["Map"]={q:1,n:2};
$TYPE["Map"]={name:"Map",native:"Map",arms:{["MTip"]:{types:[],q:[],fields:[]},["MLeaf"]:{types:[({r:"String",a:[],s:"",i:{}}),({p:1})],q:[1,1],fields:["key","val"]},["MNode"]:{types:[({r:"Nat",a:[],s:"",i:{}}),({r:"Map",h:({r:"Map",a:[],s:"",i:{}}),a:[({p:2}),({p:1})],s:"",i:{},f:1}),({r:"Map",h:({r:"Map",a:[],s:"",i:{}}),a:[({p:3}),({p:2})],s:"",i:{},f:1})],q:[1,1,1],fields:["pos","lo","hi"]}}};
$PARAMS["IO.OP"]={q:0,n:1};
$TYPE["IO.OP"]={name:"IO.OP",native:"IO.OP",arms:{["Emit"]:{types:[({p:0})],q:[1],fields:["value"]},["Halt"]:{types:[({r:"U32",a:[],s:"",i:{}}),({r:"String",a:[],s:"",i:{}})],q:[1,1],fields:["code","message"]},["Exit"]:{types:[({r:"U32",a:[],s:"",i:{}})],q:[1],fields:["code"]}}};
$PARAMS["App"]={q:0,n:1};
$TYPE["App"]={name:"App",native:"App",arms:{["App"]:{types:[({all:({p:0}),q:1,body:({r:"Pair",a:[({p:1}),({r:"Image",a:[],s:"",i:{}})],s:"",i:{}})}),({all:({r:"List",h:({r:"List",a:[],s:"",i:{}}),a:[({r:"Event",a:[],s:"",i:{}})],s:"",i:{},f:1}),q:1,body:({all:({p:2}),q:1,body:({r:"IO",a:[({r:"Maybe",h:({r:"Maybe",a:[],s:"",i:{}}),a:[({p:3})],s:"",i:{},f:1})],s:"",i:{}})})})],q:[1,1],fields:["view","tick"]}}};
$PARAMS["Set"]={q:0,n:0};
$TYPEF["Set"]={n:0,native:"Set",body:({r:"Map",a:[({k:"Q",v:2}),({r:"Unit",a:[],s:"",i:{}})],s:"",i:{}})};
$PARAMS["Or"]={q:0,n:2};
$TYPEF["Or"]={n:2,native:"Or",body:({r:"Either",a:[({k:"Q",v:1}),({k:"Q",v:1}),({p:1}),({p:0})],s:"",i:{}})};
$PARAMS["Exists"]={q:0,n:2};
$TYPEF["Exists"]={n:2,native:"Exists",body:({r:"Sigma",a:[({k:"Q",v:1}),({k:"Q",v:1}),({p:1}),({p:0})],s:"",i:{}})};
$PARAMS["IO"]={q:0,n:1};
$TYPEF["IO"]={n:1,native:"IO",body:({all:({kind:({k:"Q",v:1})}),q:0,body:({all:({all:({p:1}),q:1,body:({r:"IO.OP",a:[({p:1})],s:"",i:{}})}),q:1,body:({r:"IO.OP",a:[({p:1})],s:"",i:{}})})})};
$PARAMS["Pair"]={q:0,n:2};
$TYPEF["Pair"]={n:2,native:"Pair",body:({r:"Sigma",a:[({k:"Q",v:1}),({k:"Q",v:1}),({p:1}),({lam:({p:1}),q:0})],s:"",i:{}})};
$PARAMS["Word"]={q:0,n:1};
$TYPEF["Word"]={n:1,native:"Word",body:({match:[({p:0})],cases:[({pat:[({c:"Zero",s:"",i:{},fields:[]})],body:({r:"Word.Nil",a:[],s:"",i:{}})}),({pat:[({c:"Succ",s:"",i:{},fields:[({v:true,q:1})]})],body:({r:"Word.Con",a:[({p:0})],s:"",i:{}})})]})};
(() => {
// Audio
// =====

function audio_close(audio) {
  return { $: "Unit" };
}

io_eff("Audio.close", audio_close);

})();

(() => {
// Audio
// =====

const AUDIO_RING = 4096; // Frames; matches IO_RING in audio.c.

function audio_write(audio, samples) {
  let n = 0;
  for (let xs = samples; xs.$ === "Con"; xs = xs.tail) {
    n += 1;
  }
  const frames = Math.floor(n / 2);
  const now = performance.now();
  const drained = Math.floor((now - audio.at) * audio.rate / 1000);
  audio.queued = Math.max(0, audio.queued - drained);
  // Carry subframe time while playing; idle time cannot drain future writes.
  audio.at = audio.queued === 0 || audio.rate === 0
    ? now : audio.at + drained * 1000 / audio.rate;
  // Complete stereo frames only; oversized writes are dropped whole.
  if (n <= AUDIO_RING * 2 && audio.queued + frames <= AUDIO_RING) {
    audio.queued += frames;
  }
  return io_tup(audio, audio.queued);
}

io_eff("Audio.write", audio_write);

})();

(() => {
// Audio
// =====

// A silent device: the ring's queue drains by the clock.
function audio_open(rate) {
  if (rate < 8000 || rate > 192000) {
    return io_fail(22);
  }
  // tests/io/audio_whole_frames.js pauses its device through the rate field.
  return io_done({ rate, queued: 0, at: performance.now() });
}

io_eff("Audio.open", audio_open);

})();

(() => {
// Window
// ======

function window_close(window) {
  return { $: "Unit" };
}

io_eff("Window.close", window_close);

})();

(() => {
// Window
// ======

function window_grab(window, on) {
  return window;
}

io_eff("Window.grab", window_grab);

})();

(() => {
// Window
// ======

function window_set_title(window, title) {
  return window;
}

io_eff("Window.set_title", window_set_title);

})();

(() => {
// Window
// ======

function window_frame(window, image) {
  return io_tup(window, image, { $: "Nil" });
}

io_eff("Window.frame", window_frame);

})();

(() => {
// Window
// ======

function window_open(title, width, height) {
  const code = process.platform === "darwin" ? 45 : 95;
  const text = "Window.open: no display (build a native binary with bend <file> -o <out> and run it from a desktop session)";
  return { $: "Fail", error: io_tup(code, text) };
}

io_eff("Window.open", window_open);

})();

(() => {
// Listener
// ========

function listener_close(listener) {
  io_sys().close(listener);
  return { $: "Unit" };
}

io_eff("Listener.close", listener_close);

})();

(() => {
// Socket
// ======

function socket_close(socket) {
  io_sys().close(socket);
  return { $: "Unit" };
}

io_eff("Socket.close", socket_close);

})();

(() => {
// UDP
// ===

// The request parks until the socket is readable, so a backlog never keeps
// the loop from its timers; a recv that still finds no datagram (the socket
// is non-blocking) parks again. The datagram, read makes a String (io_text)
// or a List of bytes (io_list).
function udp_recv_from_with(socket, max, k, read, at) {
  if (Number(max) === 0) {
    return io_tup(socket, io_ready(at, io_fail(22)));
  }
  const sys = io_sys();
  const fd = socket;
  // IPv4's 65535-byte packet has at least 20 IP and 8 UDP header bytes.
  const size = Math.min(Number(max), 65507);
  const b = new Uint8Array(size);
  const peer = new Uint8Array(16);
  const len = new Uint32Array([16]);
  const go = () => {
    const got = sys.recvfrom(fd, sys.ptr(b), size, 0, sys.ptr(peer),
      sys.ptr(len));
    const n = Number(got);
    if (n < 0) {
      const code = sys.errno();
      if (code !== (sys.mac ? 35 : 11)) {
        return io_tup(socket, io_ready(at, io_fail(code)));
      }
      if (io_late(at)) {
        return io_tup(socket, { $: "Wait", rest: { $: "Unit" } });
      }
      io_park_on(fd, false, k, go, at);
      return undefined;
    }
    const host = peer[4] + "." + peer[5] + "." + peer[6] + "." + peer[7];
    const port = (peer[2] << 8) | peer[3];
    const dgram = io_tup(host, port, read(b, n));
    return io_tup(socket, io_ready(at, io_done(dgram)));
  };
  io_park_on(fd, false, k, go, at);
  return undefined;
}

function udp_recv_from(socket, max, k) {
  return udp_recv_from_with(socket, max, k, io_text);
}

function udp_recv_bytes_from(socket, max, k) {
  return udp_recv_from_with(socket, max, k, io_list);
}

// The try_ twins pass a deadline at: past it, a recv that would wait
// answers Wait{}.
function udp_try_recv_from(socket, max, ms, k) {
  return udp_recv_from_with(socket, max, k, io_text, io_until(ms));
}

function udp_try_recv_bytes_from(socket, max, ms, k) {
  return udp_recv_from_with(socket, max, k, io_list, io_until(ms));
}

io_eff("UDP.recv_from", udp_recv_from);
io_eff("UDP.recv_bytes_from", udp_recv_bytes_from);
io_eff("UDP.try_recv_from", udp_try_recv_from);
io_eff("UDP.try_recv_bytes_from", udp_try_recv_bytes_from);

})();

(() => {
// UDP
// ===

// A datagram goes whole or not at all; a full send buffer (non-blocking,
// so EAGAIN) parks the computation until the socket is writable. b is the
// datagram's bytes, data the value a failed or late send hands back.
function udp_send_to_with(socket, host, port, data, b, k, at) {
  const fail = (code) => io_tup(socket, io_ready(at, io_fail(code, data)));
  const sys = io_sys();
  const fd = socket;
  const to = io_addr(host, Number(port));
  if (to === null) {
    return fail(22);
  }
  const go = () => {
    const sent = sys.sendto(fd, b.length ? sys.ptr(b) : null, b.length, 0, sys.ptr(to), 16);
    if (Number(sent) < 0) {
      const code = sys.errno();
      if (code !== (sys.mac ? 35 : 11)) {
        return fail(code);
      }
      if (io_late(at)) {
        return io_tup(socket, { $: "Wait", rest: data });
      }
      io_park_on(fd, true, k, go, at);
      return undefined;
    }
    return io_tup(socket, io_ready(at, io_done({ $: "Unit" })));
  };
  return go();
}

// A value past 255 fails with EINVAL before the datagram is sent, list kept.
function udp_send_bytes_to_with(socket, host, port, data, k, at) {
  const b = io_unlist(data);
  if (b !== null) {
    return udp_send_to_with(socket, host, port, data, b, k, at);
  }
  return io_tup(socket, io_ready(at, io_fail(22, data)));
}

function udp_send_to(socket, host, port, data, k) {
  return udp_send_to_with(socket, host, port, data, io_bytes(data), k);
}

function udp_send_bytes_to(socket, host, port, data, k) {
  return udp_send_bytes_to_with(socket, host, port, data, k);
}

// The try_ twins pass a deadline at: past it, a send that would wait is
// Wait{data}.
function udp_try_send_to(socket, host, port, data, ms, k) {
  return udp_send_to_with(socket, host, port, data, io_bytes(data), k,
    io_until(ms));
}

function udp_try_send_bytes_to(socket, host, port, data, ms, k) {
  return udp_send_bytes_to_with(socket, host, port, data, k, io_until(ms));
}

io_eff("UDP.send_to", udp_send_to);
io_eff("UDP.send_bytes_to", udp_send_bytes_to);
io_eff("UDP.try_send_to", udp_try_send_to);
io_eff("UDP.try_send_bytes_to", udp_try_send_bytes_to);

})();

(() => {
// UDP
// ===

function udp_bind(host, port) {
  const at = io_addr(host, Number(port));
  if (at === null) {
    return io_fail(22);
  }
  const sys = io_sys();
  const fd = sys.socket(2, 2, 0);
  if (fd < 0) {
    return io_fail(sys.errno());
  }
  if (sys.bind(fd, sys.ptr(at), 16) < 0
    || sys.fcntl(fd, 4, sys.fcntl(fd, 3, 0) | (sys.mac ? 4 : 0x800)) < 0) {
    const code = sys.errno();
    sys.close(fd);
    return io_fail(code);
  }
  return io_done(fd);
}

io_eff("UDP.bind", udp_bind);

})();

(() => {
// TCP
// ===

// A recv that finds nothing (the socket is non-blocking) parks until the
// socket is readable. What it finds, read makes a String (io_text) or a
// List of bytes (io_list).
function tcp_recv_with(socket, max, k, read, at) {
  if (Number(max) === 0) {
    return io_tup(socket, io_ready(at, io_fail(22)));
  }
  const sys = io_sys();
  const fd = socket;
  const b = new Uint8Array(Number(max));
  const again = sys.mac ? 35 : 11;
  const go = () => {
    const n = Number(sys.recv(fd, sys.ptr(b), Number(max), 0));
    if (n < 0) {
      const code = sys.errno();
      if (code !== again) {
        return io_tup(socket, io_ready(at, io_fail(code)));
      }
      if (io_late(at)) {
        return io_tup(socket, { $: "Wait", rest: { $: "Unit" } });
      }
      io_park_on(fd, false, k, go, at);
      return undefined;
    }
    const got = n === 0 ? { $: "None" }
      : { $: "Some", value: read(b, n) };
    return io_tup(socket, io_ready(at, io_done(got)));
  };
  return go();
}

function tcp_recv(socket, max, k) {
  return tcp_recv_with(socket, max, k, io_text);
}

function tcp_recv_bytes(socket, max, k) {
  return tcp_recv_with(socket, max, k, io_list);
}

// The try_ twins pass a deadline at: past it, a recv that would wait is Wait{}.
function tcp_try_recv(socket, max, ms, k) {
  return tcp_recv_with(socket, max, k, io_text, io_until(ms));
}

function tcp_try_recv_bytes(socket, max, ms, k) {
  return tcp_recv_with(socket, max, k, io_list, io_until(ms));
}

io_eff("TCP.recv", tcp_recv);
io_eff("TCP.recv_bytes", tcp_recv_bytes);
io_eff("TCP.try_recv", tcp_try_recv);
io_eff("TCP.try_recv_bytes", tcp_try_recv_bytes);

})();

(() => {
// TCP
// ===

// Sends what is left; a full socket (non-blocking, so EAGAIN) parks the
// computation until the socket is writable, and the loop resumes here.
function tcp_send_with(socket, b, k, at) {
  const sys = io_sys();
  const fd = socket;
  const again = sys.mac ? 35 : 11;
  const go = (off) => {
    while (off < b.length) {
      const part = b.subarray(off);
      const n = Number(sys.send(fd, sys.ptr(part), part.length, 0));
      if (n < 0) {
        const code = sys.errno();
        if (code !== again) {
          const fail = io_fail(code, io_list(part, part.length));
          return io_tup(socket, io_ready(at, fail));
        }
        if (io_late(at)) {
          const rest = io_list(part, part.length);
          return io_tup(socket, { $: "Wait", rest: rest });
        }
        io_park_on(fd, true, k, () => go(off), at);
        return undefined;
      }
      off += n;
    }
    return io_tup(socket, io_ready(at, io_done({ $: "Unit" })));
  };
  return go(0);
}

// A value past 255 fails with EINVAL before any byte is sent, list kept.
function tcp_send_bytes_with(socket, data, k, at) {
  const b = io_unlist(data);
  if (b !== null) {
    return tcp_send_with(socket, b, k, at);
  }
  return io_tup(socket, io_ready(at, io_fail(22, data)));
}

function tcp_send(socket, data, k) {
  return tcp_send_with(socket, io_bytes(data), k);
}

function tcp_send_bytes(socket, data, k) {
  return tcp_send_bytes_with(socket, data, k);
}

// The try_ twins pass a deadline at: past it, a waiting send is Wait{rest}.
function tcp_try_send(socket, data, ms, k) {
  return tcp_send_with(socket, io_bytes(data), k, io_until(ms));
}

function tcp_try_send_bytes(socket, data, ms, k) {
  return tcp_send_bytes_with(socket, data, k, io_until(ms));
}

io_eff("TCP.send", tcp_send);
io_eff("TCP.send_bytes", tcp_send_bytes);
io_eff("TCP.try_send", tcp_try_send);
io_eff("TCP.try_send_bytes", tcp_try_send_bytes);

})();

(() => {
// TCP
// ===

// The socket is non-blocking for life: EINPROGRESS parks the computation
// until the socket is writable, and then SO_ERROR says how the connect ended.
function tcp_connect(host, port, k) {
  const at = io_addr(host, Number(port));
  if (at === null) {
    return io_fail(22);
  }
  const sys = io_sys();
  const fd = sys.socket(2, 1, 0);
  if (fd < 0) {
    return io_fail(sys.errno());
  }
  const end = (code) => {
    if (code !== 0) {
      sys.close(fd);
      return io_fail(code);
    }
    return io_done(fd);
  };
  const error = () => {
    const v = new Int32Array([0]);
    const l = new Uint32Array([4]);
    return sys.getsockopt(fd, sys.mac ? 0xffff : 1, sys.mac ? 0x1007 : 4,
      sys.ptr(v), sys.ptr(l)) < 0 ? sys.errno() : v[0];
  };
  const set = sys.fcntl(fd, 4, sys.fcntl(fd, 3, 0) | (sys.mac ? 4 : 0x800));
  const ok = set >= 0 && sys.connect(fd, sys.ptr(at), 16) >= 0;
  const code = ok ? 0 : sys.errno();
  if (code !== (sys.mac ? 36 : 115)) {
    return end(code);
  }
  io_park_on(fd, true, k, () => end(error()));
  return undefined;
}

io_eff("TCP.connect", tcp_connect);

})();

(() => {
// TCP
// ===

// The request parks until the listener is readable, so a backlog never
// keeps the loop from its timers; an accept that still finds no connection
// (the listener is non-blocking) parks again. The accepted socket is
// non-blocking for life.
function tcp_accept_with(listener, k, at) {
  const sys = io_sys();
  const lfd = listener;
  const go = () => {
    const fd = sys.accept(lfd, null, null);
    if (fd < 0) {
      const code = sys.errno();
      if (code !== (sys.mac ? 35 : 11)) {
        return io_tup(listener, io_ready(at, io_fail(code)));
      }
      if (io_late(at)) {
        return io_tup(listener, { $: "Wait", rest: { $: "Unit" } });
      }
      io_park_on(lfd, false, k, go, at);
      return undefined;
    }
    if (sys.fcntl(fd, 4, sys.fcntl(fd, 3, 0) | (sys.mac ? 4 : 0x800)) < 0) {
      const code = sys.errno();
      sys.close(fd);
      return io_tup(listener, io_ready(at, io_fail(code)));
    }
    return io_tup(listener, io_ready(at, io_done(fd)));
  };
  io_park_on(lfd, false, k, go, at);
  return undefined;
}

function tcp_accept(listener, k) {
  return tcp_accept_with(listener, k);
}

// try_ passes a deadline at: past it, an accept that would wait answers Wait{}.
function tcp_try_accept(listener, ms, k) {
  return tcp_accept_with(listener, k, io_until(ms));
}

io_eff("TCP.accept", tcp_accept);
io_eff("TCP.try_accept", tcp_try_accept);

})();

(() => {
// TCP
// ===

function tcp_listen(host, port) {
  const at = io_addr(host, Number(port));
  if (at === null) {
    return io_fail(22);
  }
  const sys = io_sys();
  const fd = sys.socket(2, 1, 0);
  if (fd < 0) {
    return io_fail(sys.errno());
  }
  const one = new Int32Array([1]);
  const level = sys.mac ? 0xffff : 1;
  sys.setsockopt(fd, level, sys.mac ? 4 : 2, sys.ptr(one), 4);
  if (sys.bind(fd, sys.ptr(at), 16) < 0 || sys.listen(fd, 512) < 0
    || sys.fcntl(fd, 4, sys.fcntl(fd, 3, 0) | (sys.mac ? 4 : 0x800)) < 0) {
    const code = sys.errno();
    sys.close(fd);
    return io_fail(code);
  }
  return io_done(fd);
}

io_eff("TCP.listen", tcp_listen);

})();

(() => {
// File
// ====

function file_close(file) {
  const fs = require("fs");
  try {
    fs.closeSync(file);
  } catch (e) {
  }
  return { $: "Unit" };
}

io_eff("File.close", file_close);

})();

(() => {
// File
// ====

function file_write_buffer(file, b) {
  const fs = require("fs");
  let at = 0;
  try {
    while (at < b.length) {
      const n = fs.writeSync(file, b, at, b.length - at, null);
      // no progress would retry forever (#1445)
      if (n === 0) {
        return io_tup(file, io_fail(5));
      }
      at += n;
    }
    return io_tup(file, io_done({ $: "Unit" }));
  } catch (e) {
    return io_tup(file, io_fail(Math.abs(e.errno ?? 5)));
  }
}

function file_write(file, data) {
  return file_write_buffer(file, io_bytes(data));
}

function file_write_bytes(file, data) {
  const b = io_unlist(data);
  return b === null ? io_tup(file, io_fail(22)) : file_write_buffer(file, b);
}

io_eff("File.write", file_write);
io_eff("File.write_bytes", file_write_bytes);

})();

(() => {
// File
// ====

function file_size(file) {
  const fs = require("fs");
  try {
    const size = fs.fstatSync(file).size;
    // the EOVERFLOW errno, 84 on mac and 75 elsewhere. io_sys().mac reads
    // the same platform, but io_sys() binds libc through bun:ffi, and on a
    // host without it that ask threw where the size was already read, so
    // the catch answered Fail on a good file. Nothing above this line
    // touches the FFI table, and nothing below it should either.
    const over = process.platform === "darwin" ? 84 : 75;
    return io_tup(file, size > 4294967295 ? io_fail(over) : io_done(size));
  } catch (e) {
    return io_tup(file, io_fail(Math.abs(e.errno ?? 5)));
  }
}

io_eff("File.size", file_size);

})();

(() => {
// File
// ====

function file_read_with(file, max, offset, pack) {
  const sys = io_sys();
  const len = Math.min(max, 2147483647);
  const b = new Uint8Array(Math.max(len, 1));
  const n = Number(offset === null ? sys.read(file, sys.ptr(b), len)
    : sys.pread(file, sys.ptr(b), len, BigInt(offset)));
  return io_tup(file, n < 0 ? io_fail(sys.errno()) : io_done(pack(b, n)));
}

function file_read(file, max) {
  return file_read_with(file, max, null, io_text);
}

function file_read_bytes(file, max) {
  return file_read_with(file, max, null, io_list);
}

function file_read_at(file, offset, max) {
  return file_read_with(file, max, offset, io_list);
}

io_eff("File.read", file_read);
io_eff("File.read_bytes", file_read_bytes);
io_eff("File.read_at", file_read_at);

})();

(() => {
// File
// ====

// name is the path's bytes, or null if a value is past 255.
function file_open_with(name, mode) {
  if (name === null) {
    return io_fail(22);
  }
  if (name.includes(0)) {
    return io_fail(process.platform === "darwin" ? 92 : 84);
  }
  if (!["r", "w", "a", "x"].includes(mode)) {
    return io_fail(22);
  }
  try {
    // Node spells "x" as "wx".
    const fd = require("fs").openSync(name.length > 0 ? Buffer.from(name) : "",
      mode === "x" ? "wx" : mode, 0o644);
    return io_done(fd);
  } catch (e) {
    return io_fail(-e.errno);
  }
}

function file_open(path, mode) {
  return file_open_with(io_bytes(path), mode);
}

function file_open_bytes(path, mode) {
  return file_open_with(io_unlist(path), mode);
}

io_eff("File.open", file_open);
io_eff("File.open_bytes", file_open_bytes);

})();

(() => {
// Chan
// ====

// Chan.new, send, recv, close and the try_ twins share this file.

// A parked receiver holds CHAN_RECV: the C lane parks TERM_HOLE, and a
// program can make neither. A sent value may be null (an erased proof).
const CHAN_RECV = Symbol();

function chan_done() {
  return { $: "Done", value: { $: "Unit" } };
}

function chan_wait(item) {
  return { $: "Wait", rest: item === CHAN_RECV ? { $: "Unit" } : item };
}

// The first waiter, past those whose IO has returned (a nested io_run): their
// computations are gone with it, so the row drops them and their items.
function chan_head(row) {
  while (row.wait.length > 0 && row.wait[0].io.done) {
    row.wait.shift();
  }
  return row.wait[0];
}

// Wakes the first live waiter with x, as Ready{x} if try_ (cutting its timer,
// if the poller has not taken it yet), on the IO that parked it: a nested
// io_run may wake an outer one.
function chan_wake(row, x) {
  const w = chan_head(row);
  row.wait.shift();
  if (w.late !== undefined) {
    const ws = w.io.waits;
    const at = ws.findIndex((t) => t.more === w.late);
    if (at >= 0) ws.splice(at, 1);
    x = { $: "Ready", value: x };
  }
  io_push(w.cont, x, false, w.io);
  return w.item;
}

function chan_take(row) {
  const v = row.ring.shift();
  if (chan_head(row) !== undefined) {
    row.ring.push(chan_wake(row, chan_done()));
  }
  return v;
}

// A handle is the row (a stale copy keeps it, shut).
function chan_shut(row) {
  row.shut = true;
  while (chan_head(row) !== undefined) {
    const item = row.wait[0].item;
    chan_wake(row, item === CHAN_RECV ? { $: "None" }
      : { $: "Fail", error: item });
  }
}

// Parks k on row with item; with ms, a timer too, whose late answers Wait:
// the first of the two to come cuts the other.
function chan_park(row, k, item, ms) {
  const w = { io: io_active, cont: k, item: item };
  if (ms !== undefined) {
    w.late = () => {
      // An earlier callback of the same ready batch may have woken w.
      const at = row.wait.indexOf(w);
      if (at < 0) return undefined;
      row.wait.splice(at, 1);
      return chan_wait(item);
    };
    io_park_on(undefined, false, k, w.late, io_until(ms));
  }
  row.wait.push(w);
  return undefined;
}

// Sends without waiting: Done{}, Fail{v} if closed, undefined if it would.
function chan_put(row, value) {
  if (row.shut) {
    return { $: "Fail", error: value };
  }
  if (chan_head(row)?.item === CHAN_RECV) {
    chan_wake(row, { $: "Some", value: value });
    return chan_done();
  }
  if (row.ring.length < row.room) {
    row.ring.push(value);
    return chan_done();
  }
  return undefined;
}

// Receives without waiting: Some{v}, None{} at the end, undefined if not.
function chan_get(row) {
  if (row.ring.length > 0) {
    return { $: "Some", value: chan_take(row) };
  }
  const w = chan_head(row);
  if (w !== undefined && w.item !== CHAN_RECV) {
    return { $: "Some", value: chan_wake(row, chan_done()) };
  }
  if (row.shut) {
    return { $: "None" };
  }
  return undefined;
}

// Ready{x} now, Wait{rest} now if ms is 0, else parks until a wake or ms.
function chan_try(row, x, item, ms, k) {
  if (x !== undefined) {
    return { $: "Ready", value: x };
  }
  if (Number(ms) === 0) {
    return chan_wait(item);
  }
  return chan_park(row, k, item, Number(ms));
}

function chan_new(room) {
  return { room: Number(room), ring: [], wait: [], shut: false };
}

function chan_send(row, value, k) {
  const x = chan_put(row, value);
  return x !== undefined ? x : chan_park(row, k, value);
}

function chan_recv(row, k) {
  const x = chan_get(row);
  return x !== undefined ? x : chan_park(row, k, CHAN_RECV);
}

function chan_try_send(row, value, ms, k) {
  return chan_try(row, chan_put(row, value), value, ms, k);
}

function chan_try_recv(row, ms, k) {
  return chan_try(row, chan_get(row), CHAN_RECV, ms, k);
}

function chan_close(row) {
  if (!row.shut) {
    chan_shut(row);
  }
  return { $: "Unit" };
}

io_eff("Chan.new", chan_new);
io_eff("Chan.send", chan_send);
io_eff("Chan.recv", chan_recv);
io_eff("Chan.try_send", chan_try_send);
io_eff("Chan.try_recv", chan_try_recv);
io_eff("Chan.close", chan_close);

})();

(() => {
// IO
// ==

// A JS program runs one thread.
function io_thread_count() {
  return 1;
}

io_eff("IO.thread_count", io_thread_count);

})();

(() => {
// IO
// ==

function io_now() {
  return Math.floor(performance.now());
}

io_eff("IO.now", io_now);

})();

(() => {
// IO
// ==

// Parks until ms milliseconds from now.
function io_sleep(ms, k) {
  io_park_on(undefined, false, k, () => ({ $: "Unit" }),
    performance.now() + Number(ms));
}

io_eff("IO.sleep", io_sleep);

})();

(() => {
// IO
// ==

function io_spawn(act) {
  io_push(act, (x) => ({ $: "Emit", value: x }), true);
  return { $: "Unit" };
}

io_eff("IO.spawn", io_spawn);

})();

(() => {
// IO
// ==

// WebCrypto answers Fail by throwing, and a host without it throws a
// ReferenceError on the name, so the declared Result is what a program
// that handles Fail already expects here. The C lane gets the errno out
// of getrandom; WebCrypto carries no errno on any host, so EIO stands in
// and io_fail(5) says what process_run.js already says when Bun throws
// without one.
function io_random_u32() {
  try {
    return io_done(crypto.getRandomValues(new Uint32Array(1))[0]);
  } catch (_) {
    return io_fail(5);
  }
}

io_eff("IO.random_u32", io_random_u32);

})();

(() => {
// Process
// =======

const PROCESS_WORKER = `
const { errno, signals } = require("node:os").constants;
const { parentPort } = require("node:worker_threads");
const { spawn } = require("node:child_process");
let port;
let flag;

parentPort.on("message", async (data) => {
  if (data.port !== undefined) {
    ({ port, flag } = data);
    return;
  }
  let got;
  try {
    got = await run(data);
  } catch (e) {
    got = { fail: errno[e] ?? (typeof e?.errno === "number"
      ? Math.abs(e.errno) : errno.EIO) };
  }
  port.postMessage(got);
  Atomics.store(flag, 0, 1);
  Atomics.notify(flag, 0);
});

function run({ argv, input, env, max, ms }) {
  return new Promise((yes, no) => {
    const proc = spawn(argv[0], argv.slice(1), { env,
      stdio: ["pipe", "pipe", "pipe"] });
    // Node destroys proc.stdin at exit; a descendant may still read it.
    const stdin = proc.stdin;
    proc.stdin = null;
    const chunks = [[], []];
    let size = 0;
    let error;
    const fail = (e) => {
      if (error !== undefined) return;
      error = e;
      proc.kill("SIGKILL");
      stdin.destroy();
      proc.stdout.destroy();
      proc.stderr.destroy();
    };
    proc.once("error", fail);
    stdin.on("error", (e) => {
      if (e.code !== "EPIPE") fail(e);
    });
    [proc.stdout, proc.stderr].forEach((stream, i) => {
      stream.on("error", fail);
      stream.on("data", (chunk) => {
        if (error !== undefined) return;
        size += chunk.length;
        if (size > max) fail("EFBIG");
        else chunks[i].push(chunk);
      });
    });
    // Feed stdin until the child exits and its stdout and stderr close.
    let live = 3;
    const done = () => --live || stdin.destroy();
    proc.once("exit", done);
    proc.stdout.once("close", done);
    proc.stderr.once("close", done);
    const timer = setTimeout(() => fail("ETIMEDOUT"),
      Math.min(ms, 2 ** 31 - 1));
    proc.once("close", (code, signal) => {
      clearTimeout(timer);
      if (error !== undefined) no(error);
      else yes({ code: code ?? 128 + (signals[signal] ?? 0),
        out: Buffer.concat(chunks[0]).toString("utf8"),
        err: Buffer.concat(chunks[1]).toString("utf8") });
    });
    stdin.end(input);
  });
}
`;

let process_worker = null;

function process_run(program, args, input, maxOutput, timeoutMs) {
  const argv = [str_out(program)];
  for (let xs = args; xs.$ === "Con"; xs = xs.tail) {
    argv.push(str_out(xs.head));
  }
  if (maxOutput === 0 || timeoutMs === 0
    || argv.some((arg) => arg.includes("\0"))) {
    return io_fail(22);
  }
  if (process_worker === null) {
    const { Worker, MessageChannel, receiveMessageOnPort } = require("node:worker_threads");
    const { port1, port2 } = new MessageChannel();
    const flag = new Int32Array(new SharedArrayBuffer(4));
    const worker = new Worker(PROCESS_WORKER, { eval: true });
    worker.unref();
    worker.postMessage({ port: port2, flag }, [port2]);
    process_worker = { worker, port: port1, flag, receive: receiveMessageOnPort };
  }
  const { worker, port, flag, receive } = process_worker;
  Atomics.store(flag, 0, 0);
  worker.postMessage({ argv, input: io_bytes(input), env: { ...process.env },
    max: maxOutput, ms: timeoutMs });
  if (Atomics.wait(flag, 0, 0, timeoutMs + 1000) === "timed-out") {
    worker.terminate();
    process_worker = null;
    return io_fail(5);
  }
  const got = receive(port).message;
  return got.fail !== undefined ? io_fail(got.fail)
    : io_done(io_tup(got.code, got.out, got.err));
}

io_eff("Process.run", process_run);

})();

(() => {
// IO
// ==

function io_args() {
  let xs = { $: "Nil" };
  for (let i = cli_args.length; i > 0; i -= 1) {
    xs = { $: "Con", head: cli_args[i - 1], tail: xs };
  }
  return xs;
}

// Node and Bun decode the arguments before a program sees them, so here a
// byte that isn't UTF-8 arrives as U+FFFD's UTF-8, EF BF BD.
function io_args_bytes() {
  let xs = { $: "Nil" };
  for (let i = cli_args.length; i > 0; i -= 1) {
    const b = io_bytes(cli_args[i - 1]);
    xs = { $: "Con", head: io_list(b, b.length), tail: xs };
  }
  return xs;
}

io_eff("IO.args", io_args);
io_eff("IO.args_bytes", io_args_bytes);

})();

(() => {
// IO
// ==

function io_get_env(name) {
  name = str_out(name);
  // Node cuts a name at a NUL; reject it like get_env.c (#1449).
  // Node's getenv may also read "A=B" as A's entry "A=B=C"; reject a "=" too.
  if (name.includes("\0") || name.includes("=")) return io_fail(2);
  const value = Object.hasOwn(process.env, name) ? process.env[name] : undefined;
  return value === undefined ? io_fail(2) : io_done(value);
}

io_eff("IO.get_env", io_get_env);

})();

(() => {
// IO
// ==

function io_print_err(text) {
  io_errs(text);
  return { $: "Unit" };
}

io_eff("IO.print_err", io_print_err);

})();

(() => {
// IO
// ==

function io_write(text) {
  io_out(1, io_bytes(text));
  return { $: "Unit" };
}

io_eff("IO.write", io_write);

})();

(() => {
// IO
// ==

function io_print(text) {
  io_out(1, io_bytes(text + "\n"));
  return { $: "Unit" };
}

io_eff("IO.print", io_print);

})();

function $b4($v2,$td=0){$case3:{const $v4=($v2&&$v2.$==="Tuple");if($v4){const $v5=$v2.fst;const $v7=$v2.snd;return $v5;}else{break $case3;}}throw "bend: runtime fail-stop";}
function $b5($v2,$td=0){$case9:{const $v10=($v2&&$v2.$==="Tuple");if($v10){const $v11=$v2.fst;const $v13=$v2.snd;return $v13;}else{break $case9;}}throw "bend: runtime fail-stop";}
function $b438($c0,$v15,$td=0){return run_tail($v15,$c0);}
function $b7($v1,$td=0){const $v18=(($c0)=>run_clo(($v15,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b438($c0,$v15,$td+1):run_named2($b438,$c0,$v15,$td)),$raw,$base0,$sp0);}))($v1);return $v18;}
function $b440($c0,$c1,$v21,$td=0){$stArgs[$sp++]=$c1;return $split1($c0,$v21,$k23,$sp-1);}
function $k23($v23,$base,$td=0){const $c1=$stArgs[$base+0];return run_tail($v23,$c1);}
function $b439($c0,$c1,$v19,$td=0){const $v25=(($c0,$c1)=>run_clo(($v21,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b440($c0,$c1,$v21,$td+1):run_named3($b440,$c0,$c1,$v21,$td)),$raw,$base0,$sp0);}))($c1,$v19);return run_tail($c0,$v25);}
function $b8($v2,$v3,$td=0){const $v27=(($c0,$c1)=>run_clo(($v19,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b439($c0,$c1,$v19,$td+1):run_named3($b439,$c0,$c1,$v19,$td)),$raw,$base0,$sp0);}))($v2,$v3);return $v27;}
function $b441($c0,$c1,$v28,$td=0){const $v30=({$:"Halt","code":$c0,"message":$c1});return $v30;}
function $b16($v1,$v2,$td=0){const $v31=(($c0,$c1)=>run_clo(($v28,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b441($c0,$c1,$v28,$td+1):run_named3($b441,$c0,$c1,$v28,$td)),$raw,$base0,$sp0);}))($v1,$v2);return $v31;}
function $b442($c0,$v32,$td=0){const $v34=({$:"Exit","code":$c0});return $v34;}
function $b17($v0,$td=0){const $v35=(($c0)=>run_clo(($v32,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b442($c0,$v32,$td+1):run_named2($b442,$c0,$v32,$td)),$raw,$base0,$sp0);}))($v0);return $v35;}
function $b18($v1,$td=0){$case36:{const $v37=($v1&&$v1.$==="Done");if($v37){const $v38=$v1.value;return ($td<64?$b7($v38,$td+1):run_named1($b7,$v38,$td));}else{break $case36;}}$case41:{const $v42=($v1&&$v1.$==="Fail");if($v42){const $v43=$v1.error;const $v44=($v43&&$v43.$==="Tuple");if($v44){const $v45=$v43.fst;const $v47=$v43.snd;return ($td<64?$b16($v45,$v47,$td+1):run_named2($b16,$v45,$v47,$td));}else{break $case41;}}else{break $case41;}}throw "bend: runtime fail-stop";}
function $b443($v1,$td=0){return ($td<64?$b18($v1,$td+1):run_named1($b18,$v1,$td));}
function $b19($v1,$td=0){const $v50=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b443($v1,$td+1):run_named1($b443,$v1,$td)),$raw,$base0,$sp0);});return ($td<64?$b8($v1,$v50,$td+1):run_named2($b8,$v1,$v50,$td));}
function $b444($c0,$v53,$td=0){const $v55=$D["Chan.send"];$stArgs[$sp++]=$v53;return $split1($v55,$c0,$k56,$sp-1);}
function $k56($v56,$base,$td=0){const $v53=$stArgs[$base+0];return run_tail($v56,$v53);}
function $b445($c0,$v63,$td=0){return ($td<64?$b7($c0,$td+1):run_named1($b7,$c0,$td));}
function $b31($v1,$v2,$td=0){const $v58=(($c0)=>run_clo(($v53,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b444($c0,$v53,$td+1):run_named2($b444,$c0,$v53,$td)),$raw,$base0,$sp0);}))($v2);{const $a0=$v1,$a1=$v58;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-1,$ki=$split_enter($k59,$kb);try{return $split_done($b8($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b8,2,$k59,$sp-1);}}
function $k59($v59,$base,$td=0){const $v2=$stArgs[$base+0];const $v61=$D["IO.spawn"];$stArgs[$sp++]=$v2;return $split1($v61,$v59,$k62,$sp-1);}
function $k62($v62,$base,$td=0){const $v2=$stArgs[$base+0];const $v66=(($c0)=>run_clo(($v63,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b445($c0,$v63,$td+1):run_named2($b445,$c0,$v63,$td)),$raw,$base0,$sp0);}))($v2);return ($td<64?$b8($v62,$v66,$td+1):run_named2($b8,$v62,$v66,$td));}
function $b446($c0,$v2,$td=0){return ($td<64?$b31($c0,$v2,$td+1):run_named2($b31,$c0,$v2,$td));}
function $b32($v1,$td=0){const $v68=$D["Chan.new"];$stArgs[$sp++]=$v1;return $split1($v68,1,$k69,$sp-1);}
function $k69($v69,$base,$td=0){const $v1=$stArgs[$base+0];const $v70=(($c0)=>run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b446($c0,$v2,$td+1):run_named2($b446,$c0,$v2,$td)),$raw,$base0,$sp0);}))($v1);return ($td<64?$b8($v69,$v70,$td+1):run_named2($b8,$v69,$v70,$td));}
function $b447($c0,$v81,$td=0){return ($td<64?$b7($c0,$td+1):run_named1($b7,$c0,$td));}
function $b33($v1,$v2,$td=0){$case72:{const $v73=($v2&&$v2.$==="None");if($v73){return ($td<64?$b16(1,"IO.join: the channel was closed",$td+1):run_named2($b16,1,"IO.join: the channel was closed",$td));}else{break $case72;}}$case75:{const $v76=($v2&&$v2.$==="Some");if($v76){const $v77=$v2.value;const $v79=$D["Chan.close"];$stArgs[$sp++]=$v77;return $split1($v79,$v1,$k80,$sp-1);}else{break $case75;}}throw "bend: runtime fail-stop";}
function $k80($v80,$base,$td=0){const $v77=$stArgs[$base+0];const $v84=(($c0)=>run_clo(($v81,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b447($c0,$v81,$td+1):run_named2($b447,$c0,$v81,$td)),$raw,$base0,$sp0);}))($v77);return ($td<64?$b8($v80,$v84,$td+1):run_named2($b8,$v80,$v84,$td));}
function $b448($c0,$v2,$td=0){return ($td<64?$b33($c0,$v2,$td+1):run_named2($b33,$c0,$v2,$td));}
function $b34($v1,$td=0){const $v86=$D["Chan.recv"];$stArgs[$sp++]=$v1;return $split1($v86,$v1,$k87,$sp-1);}
function $k87($v87,$base,$td=0){const $v1=$stArgs[$base+0];const $v88=(($c0)=>run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b448($c0,$v2,$td+1):run_named2($b448,$c0,$v2,$td)),$raw,$base0,$sp0);}))($v1);return ($td<64?$b8($v87,$v88,$td+1):run_named2($b8,$v87,$v88,$td));}
function $b449($v90,$td=0){const $v92=({$:"Some","value":$v90});return ($td<64?$b7($v92,$td+1):run_named1($b7,$v92,$td));}
function $b450($v99,$td=0){const $v101=({$:"None"});return ($td<64?$b7($v101,$td+1):run_named1($b7,$v101,$td));}
function $b451($c0,$v2,$td=0){return ($td<64?$b31($c0,$v2,$td+1):run_named2($b31,$c0,$v2,$td));}
function $b452($v110,$td=0){return ($td<64?$b34($v110,$td+1):run_named1($b34,$v110,$td));}
function $b35($v1,$v2,$td=0){const $v94=run_clo(($v90,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b449($v90,$td+1):run_named1($b449,$v90,$td)),$raw,$base0,$sp0);});{const $a0=$v2,$a1=$v94;$stArgs[$sp++]=$v1;if($td<64){const $kb=$sp-1,$ki=$split_enter($k95,$kb);try{return $split_done($b8($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b8,2,$k95,$sp-1);}}
function $k95($v95,$base,$td=0){const $v1=$stArgs[$base+0];const $v97=$D["IO.sleep"];$stArgs[$sp++]=$v95;return $split1($v97,$v1,$k98,$sp-1);}
function $k98($v98,$base,$td=0){const $v95=$stArgs[$base+0];const $v103=run_clo(($v99,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b450($v99,$td+1):run_named1($b450,$v99,$td)),$raw,$base0,$sp0);});{const $a0=$v98,$a1=$v103;$stArgs[$sp++]=$v95;if($td<64){const $kb=$sp-1,$ki=$split_enter($k104,$kb);try{return $split_done($b8($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b8,2,$k104,$sp-1);}}
function $k104($v104,$base,$td=0){const $v95=$stArgs[$base+0];{const $a0=$v95;$stArgs[$sp++]=$v104;if($td<64){const $kb=$sp-1,$ki=$split_enter($k106,$kb);try{return $split_done($b32($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b32,1,$k106,$sp-1);}}
function $k106($v106,$base,$td=0){const $v104=$stArgs[$base+0];const $v107=(($c0)=>run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b451($c0,$v2,$td+1):run_named2($b451,$c0,$v2,$td)),$raw,$base0,$sp0);}))($v104);{const $a0=$v106,$a1=$v107;if($td<64){const $kb=$sp-0,$ki=$split_enter($k108,$kb);try{return $split_done($b8($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b8,2,$k108,$sp-0);}}
function $k108($v108,$base,$td=0){const $v113=run_clo(($v110,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b452($v110,$td+1):run_named1($b452,$v110,$td)),$raw,$base0,$sp0);});return ($td<64?$b8($v108,$v113,$td+1):run_named2($b8,$v108,$v113,$td));}
function $b76($v5,$td=0){return null;}
function $b77($v3,$td=0){return null;}
function $b78($v4,$v5,$td=0){return $v4;}
function $b79($v1,$td=0){throw "bend: runtime fail-stop";}
function $b80($v0,$td=0){$case115:{const $v116=$p_is_false($v0);if($v116){return true;}else{break $case115;}}$case117:{const $v118=$p_is_true($v0);if($v118){return false;}else{break $case117;}}throw "bend: runtime fail-stop";}
function $b81($v0,$v1,$td=0){$case119:{const $v120=$p_is_false($v0);if($v120){return false;}else{break $case119;}}$case121:{const $v122=$p_is_true($v0);if($v122){return $v1;}else{break $case121;}}throw "bend: runtime fail-stop";}
function $b84($v0,$v1,$td=0){$case123:{const $v124=$p_is_false($v0);if($v124){const $v125=$p_is_false($v1);if($v125){const $v126=({$:"EQ"});return $v126;}else{break $case123;}}else{break $case123;}}$case127:{const $v128=$p_is_false($v0);if($v128){const $v129=$p_is_true($v1);if($v129){const $v130=({$:"LT"});return $v130;}else{break $case127;}}else{break $case127;}}$case131:{const $v132=$p_is_true($v0);if($v132){const $v133=$p_is_false($v1);if($v133){const $v134=({$:"GT"});return $v134;}else{break $case131;}}else{break $case131;}}$case135:{const $v136=$p_is_true($v0);if($v136){const $v137=$p_is_true($v1);if($v137){const $v138=({$:"EQ"});return $v138;}else{break $case135;}}else{break $case135;}}throw "bend: runtime fail-stop";}
function $b85($v0,$v1,$v2,$td=0){$case139:{const $v140=$p_is_false($v0);if($v140){const $v141=$p_bool_xor($v1,$v2);{const $a0=$v1,$a1=$v2;$stArgs[$sp++]=$v141;if($td<64){const $kb=$sp-1,$ki=$split_enter($k142,$kb);try{return $split_done($b81($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b81,2,$k142,$sp-1);}}else{break $case139;}}$case144:{const $v145=$p_is_true($v0);if($v145){const $v146=$p_bool_xor($v1,$v2);{const $a0=$v146;$stArgs[$sp++]=$v1;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-2,$ki=$split_enter($k147,$kb);try{return $split_done($b80($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b80,1,$k147,$sp-2);}}else{break $case144;}}throw "bend: runtime fail-stop";}
function $k142($v142,$base,$td=0){const $v141=$stArgs[$base+0];const $v143=({$:"Tuple","fst":$v141,"snd":$v142});return $v143;}
function $k147($v147,$base,$td=0){const $v1=$stArgs[$base+0];const $v2=$stArgs[$base+1];const $v148=$p_bool_or($v1,$v2);const $v149=({$:"Tuple","fst":$v147,"snd":$v148});return $v149;}
function $b86($v1,$v2,$v3,$td=0){$case150:{const $v151=$p_is_false($v1);if($v151){return $v3;}else{break $case150;}}$case152:{const $v153=$p_is_true($v1);if($v153){return $v2;}else{break $case152;}}throw "bend: runtime fail-stop";}
function $b87($v0,$td=0){$case154:{const $v155=$p_is_false($v0);if($v155){return 0;}else{break $case154;}}$case156:{const $v157=$p_is_true($v0);if($v157){return 1;}else{break $case156;}}throw "bend: runtime fail-stop";}
function $b88($v0,$td=0){$case158:{const $v159=($v0&&$v0.$==="LT");if($v159){return true;}else{break $case158;}}$case160:{return false;}throw "bend: runtime fail-stop";}
function $b89($v0,$td=0){$case162:{const $v163=($v0&&$v0.$==="EQ");if($v163){return true;}else{break $case162;}}$case164:{return false;}throw "bend: runtime fail-stop";}
function $b90($v0,$td=0){$case166:{const $v167=($v0&&$v0.$==="GT");if($v167){return true;}else{break $case166;}}$case168:{return false;}throw "bend: runtime fail-stop";}
function $b91($v0,$td=0){$case170:{const $v171=($v0&&$v0.$==="GT");if($v171){return false;}else{break $case170;}}$case172:{return true;}throw "bend: runtime fail-stop";}
function $b92($v0,$td=0){$case174:{const $v175=($v0&&$v0.$==="LT");if($v175){return false;}else{break $case174;}}$case176:{return true;}throw "bend: runtime fail-stop";}
function $b453($c0,$c1,$c2,$v185,$td=0){$case186:{const $v187=$p_is_nat_zero($v185);if($v187){const $v188=$p_nat_successor($c2);return ($td<64?$b97($c0,$c1,$v188,0,$td+1):run_named4($b97,$c0,$c1,$v188,0,$td));}else{break $case186;}}$case190:{const $v191=$p_is_nat_successor($v185);if($v191){const $v192=$p_nat_predecessor($v185);const $v194=$p_nat_successor($c1);return ($td<64?$b97($c0,$v192,$c2,$v194,$td+1):run_named4($b97,$c0,$v192,$c2,$v194,$td));}else{break $case190;}}throw "bend: runtime fail-stop";}
function $b97($v0,$v1,$v2,$v3,$td=0){$case178:{const $v179=$p_is_nat_zero($v0);if($v179){const $v180=({$:"Tuple","fst":$v2,"snd":$v3});return $v180;}else{break $case178;}}$case181:{const $v182=$p_is_nat_successor($v0);if($v182){const $v183=$p_nat_predecessor($v0);return ($td<64?$b453($v183,$v3,$v2,$v1,$td+1):run_named4($b453,$v183,$v3,$v2,$v1,$td));}else{break $case181;}}throw "bend: runtime fail-stop";}
function $b101($v0,$v1,$td=0){const $v197=$p_nat_cmp($v0,$v1);return ($td<64?$b89($v197,$td+1):run_named1($b89,$v197,$td));}
function $b102($v0,$v1,$td=0){const $v199=$p_nat_cmp($v0,$v1);{const $a0=$v199;if($td<64){const $kb=$sp-0,$ki=$split_enter($k200,$kb);try{return $split_done($b89($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b89,1,$k200,$sp-0);}}
function $k200($v200,$base,$td=0){return ($td<64?$b80($v200,$td+1):run_named1($b80,$v200,$td));}
function $b103($v0,$v1,$td=0){const $v202=$p_nat_cmp($v0,$v1);return ($td<64?$b91($v202,$td+1):run_named1($b91,$v202,$td));}
function $b104($v0,$v1,$td=0){const $v204=$p_nat_cmp($v0,$v1);return ($td<64?$b90($v204,$td+1):run_named1($b90,$v204,$td));}
function $b105($v0,$v1,$td=0){const $v206=$p_nat_cmp($v0,$v1);return ($td<64?$b92($v206,$td+1):run_named1($b92,$v206,$td));}
function $b108($v0,$td=0){$case208:{const $v209=$p_is_nat_zero($v0);if($v209){return null;}else{break $case208;}}$case210:{const $v211=$p_is_nat_successor($v0);if($v211){const $v212=$p_nat_predecessor($v0);return ($td<64?$b108($v212,$td+1):run_named1($b108,$v212,$td));}else{break $case210;}}throw "bend: runtime fail-stop";}
function $b109($v0,$v1,$td=0){$case215:{const $v216=$p_is_nat_zero($v0);if($v216){const $v217=$p_is_nat_zero($v1);if($v217){return null;}else{break $case215;}}else{break $case215;}}$case218:{const $v219=$p_is_nat_zero($v0);if($v219){const $v220=$p_is_nat_successor($v1);if($v220){const $v221=$p_nat_predecessor($v1);return null;}else{break $case218;}}else{break $case218;}}$case223:{const $v224=$p_is_nat_successor($v0);if($v224){const $v225=$p_nat_predecessor($v0);const $v227=$p_is_nat_zero($v1);if($v227){const $v228=$p_nat_successor($v225);return ($td<64?$b108($v228,$td+1):run_named1($b108,$v228,$td));}else{break $case223;}}else{break $case223;}}$case230:{const $v231=$p_is_nat_successor($v0);if($v231){const $v232=$p_nat_predecessor($v0);const $v234=$p_is_nat_successor($v1);if($v234){const $v235=$p_nat_predecessor($v1);return ($td<64?$b109($v232,$v235,$td+1):run_named2($b109,$v232,$v235,$td));}else{break $case230;}}else{break $case230;}}throw "bend: runtime fail-stop";}
function $b110($v0,$v1,$td=0){$case238:{const $v239=$p_is_nat_zero($v0);if($v239){return ($td<64?$b108($v1,$td+1):run_named1($b108,$v1,$td));}else{break $case238;}}$case242:{const $v243=$p_is_nat_successor($v0);if($v243){const $v244=$p_nat_predecessor($v0);const $v246=$p_is_nat_zero($v1);if($v246){return null;}else{break $case242;}}else{break $case242;}}$case247:{const $v248=$p_is_nat_successor($v0);if($v248){const $v249=$p_nat_predecessor($v0);const $v251=$p_is_nat_successor($v1);if($v251){const $v252=$p_nat_predecessor($v1);return ($td<64?$b110($v249,$v252,$td+1):run_named2($b110,$v249,$v252,$td));}else{break $case247;}}else{break $case247;}}throw "bend: runtime fail-stop";}
function $b111($v0,$v1,$td=0){const $v255=$p_nat_divmod($v0,$v1);return ($td<64?$b4($v255,$td+1):run_named1($b4,$v255,$td));}
function $b112($v0,$v1,$td=0){const $v257=$p_nat_divmod($v0,$v1);return ($td<64?$b5($v257,$td+1):run_named1($b5,$v257,$td));}
function $b113($v0,$v1,$td=0){$case259:{const $v260=$p_is_nat_zero($v1);if($v260){return 1;}else{break $case259;}}$case261:{const $v262=$p_is_nat_successor($v1);if($v262){const $v263=$p_nat_predecessor($v1);{const $a0=$v0,$a1=$v263;$stArgs[$sp++]=$v0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k265,$kb);try{return $split_done($b113($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b113,2,$k265,$sp-1);}}else{break $case261;}}throw "bend: runtime fail-stop";}
function $k265($v265,$base,$td=0){const $v0=$stArgs[$base+0];const $v266=$p_nat_mul($v0,$v265);return $v266;}
function $b114($v2,$td=0){const $v267=({$:"Some","value":$v2});return $v267;}
function $b115($v3,$v4,$td=0){$case268:{const $v269=($v3&&$v3.$==="None");if($v269){const $v270=({$:"None"});return $v270;}else{break $case268;}}$case271:{const $v272=($v3&&$v3.$==="Some");if($v272){const $v273=$v3.value;return run_tail($v4,$v273);}else{break $case271;}}throw "bend: runtime fail-stop";}
function $b116($v2,$v3,$td=0){$case276:{const $v277=($v2&&$v2.$==="None");if($v277){return $v3;}else{break $case276;}}$case278:{const $v279=($v2&&$v2.$==="Some");if($v279){const $v280=$v2.value;return $v280;}else{break $case278;}}throw "bend: runtime fail-stop";}
function $b117($v2,$td=0){$case282:{const $v283=($v2&&$v2.$==="None");if($v283){return false;}else{break $case282;}}$case284:{const $v285=($v2&&$v2.$==="Some");if($v285){const $v286=$v2.value;return true;}else{break $case284;}}throw "bend: runtime fail-stop";}
function $b118($v2,$td=0){{const $a0=$v2;if($td<64){const $kb=$sp-0,$ki=$split_enter($k288,$kb);try{return $split_done($b117($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b117,1,$k288,$sp-0);}}
function $k288($v288,$base,$td=0){return ($td<64?$b80($v288,$td+1):run_named1($b80,$v288,$td));}
function $b119($v3,$v4,$td=0){$case290:{const $v291=($v4&&$v4.$==="None");if($v291){const $v292=({$:"None"});return $v292;}else{break $case290;}}$case293:{const $v294=($v4&&$v4.$==="Some");if($v294){const $v295=$v4.value;return $split1($v3,$v295,$k297,$sp-0);}else{break $case293;}}throw "bend: runtime fail-stop";}
function $k297($v297,$base,$td=0){const $v298=({$:"Some","value":$v297});return $v298;}
function $b120($v2,$v3,$td=0){$case299:{const $v300=($v2&&$v2.$==="None");if($v300){return $v3;}else{break $case299;}}$case301:{const $v302=($v2&&$v2.$==="Some");if($v302){const $v303=$v2.value;const $v305=({$:"Some","value":$v303});return $v305;}else{break $case301;}}throw "bend: runtime fail-stop";}
function $b121($v4,$td=0){const $v306=({$:"Done","value":$v4});return $v306;}
function $b122($v5,$v6,$td=0){$case307:{const $v308=($v5&&$v5.$==="Fail");if($v308){const $v309=$v5.error;const $v311=({$:"Fail","error":$v309});return $v311;}else{break $case307;}}$case312:{const $v313=($v5&&$v5.$==="Done");if($v313){const $v314=$v5.value;return run_tail($v6,$v314);}else{break $case312;}}throw "bend: runtime fail-stop";}
function $b123($v4,$v5,$td=0){$case317:{const $v318=($v4&&$v4.$==="Fail");if($v318){const $v319=$v4.error;return $v5;}else{break $case317;}}$case321:{const $v322=($v4&&$v4.$==="Done");if($v322){const $v323=$v4.value;return $v323;}else{break $case321;}}throw "bend: runtime fail-stop";}
function $b124($v4,$td=0){$case325:{const $v326=($v4&&$v4.$==="Fail");if($v326){const $v327=$v4.error;return false;}else{break $case325;}}$case329:{const $v330=($v4&&$v4.$==="Done");if($v330){const $v331=$v4.value;return true;}else{break $case329;}}throw "bend: runtime fail-stop";}
function $b125($v4,$td=0){{const $a0=$v4;if($td<64){const $kb=$sp-0,$ki=$split_enter($k333,$kb);try{return $split_done($b124($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b124,1,$k333,$sp-0);}}
function $k333($v333,$base,$td=0){return ($td<64?$b80($v333,$td+1):run_named1($b80,$v333,$td));}
function $b126($v5,$v6,$td=0){$case335:{const $v336=($v6&&$v6.$==="Fail");if($v336){const $v337=$v6.error;const $v339=({$:"Fail","error":$v337});return $v339;}else{break $case335;}}$case340:{const $v341=($v6&&$v6.$==="Done");if($v341){const $v342=$v6.value;return $split1($v5,$v342,$k344,$sp-0);}else{break $case340;}}throw "bend: runtime fail-stop";}
function $k344($v344,$base,$td=0){const $v345=({$:"Done","value":$v344});return $v345;}
function $b127($v2,$td=0){$case346:{const $v347=($v2&&$v2.$==="Nil");if($v347){return 0;}else{break $case346;}}$case348:{const $v349=($v2&&$v2.$==="Con");if($v349){const $v350=$v2.head;const $v352=$v2.tail;{const $a0=$v352;if($td<64){const $kb=$sp-0,$ki=$split_enter($k354,$kb);try{return $split_done($b127($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b127,1,$k354,$sp-0);}}else{break $case348;}}throw "bend: runtime fail-stop";}
function $k354($v354,$base,$td=0){const $v355=$p_nat_successor($v354);return $v355;}
function $b128($v2,$v3,$td=0){$case356:{const $v357=($v2&&$v2.$==="Nil");if($v357){return $v3;}else{break $case356;}}$case358:{const $v359=($v2&&$v2.$==="Con");if($v359){const $v360=$v2.head;const $v362=$v2.tail;{const $a0=$v362,$a1=$v3;$stArgs[$sp++]=$v360;if($td<64){const $kb=$sp-1,$ki=$split_enter($k364,$kb);try{return $split_done($b128($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b128,2,$k364,$sp-1);}}else{break $case358;}}throw "bend: runtime fail-stop";}
function $k364($v364,$base,$td=0){const $v360=$stArgs[$base+0];const $v365=({$:"Con","head":$v360,"tail":$v364});return $v365;}
function $b129($v2,$td=0){$case366:{const $v367=($v2&&$v2.$==="Nil");if($v367){const $v368=({$:"Nil"});return $v368;}else{break $case366;}}$case369:{const $v370=($v2&&$v2.$==="Con");if($v370){const $v371=$v2.head;const $v373=$v2.tail;{const $a0=$v373;$stArgs[$sp++]=$v371;if($td<64){const $kb=$sp-1,$ki=$split_enter($k375,$kb);try{return $split_done($b129($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b129,1,$k375,$sp-1);}}else{break $case369;}}throw "bend: runtime fail-stop";}
function $k375($v375,$base,$td=0){const $v371=$stArgs[$base+0];return ($td<64?$b128($v371,$v375,$td+1):run_named2($b128,$v371,$v375,$td));}
function $b130($v2,$v3,$td=0){$case377:{const $v378=($v2&&$v2.$==="Nil");if($v378){return $v3;}else{break $case377;}}$case379:{const $v380=($v2&&$v2.$==="Con");if($v380){const $v381=$v2.head;const $v383=$v2.tail;const $v385=({$:"Con","head":$v381,"tail":$v3});return ($td<64?$b130($v383,$v385,$td+1):run_named2($b130,$v383,$v385,$td));}else{break $case379;}}throw "bend: runtime fail-stop";}
function $b131($v2,$td=0){const $v387=({$:"Nil"});return ($td<64?$b130($v2,$v387,$td+1):run_named2($b130,$v2,$v387,$td));}
function $b132($v2,$td=0){$case389:{const $v390=($v2&&$v2.$==="Nil");if($v390){return true;}else{break $case389;}}$case391:{const $v392=($v2&&$v2.$==="Con");if($v392){const $v393=$v2.head;const $v395=$v2.tail;return false;}else{break $case391;}}throw "bend: runtime fail-stop";}
function $b133($v2,$td=0){$case397:{const $v398=($v2&&$v2.$==="Nil");if($v398){const $v399=({$:"None"});return $v399;}else{break $case397;}}$case400:{const $v401=($v2&&$v2.$==="Con");if($v401){const $v402=$v2.head;const $v404=$v2.tail;const $v406=({$:"Some","value":$v402});return $v406;}else{break $case400;}}throw "bend: runtime fail-stop";}
function $b134($v2,$td=0){$case407:{const $v408=($v2&&$v2.$==="Nil");if($v408){const $v409=({$:"Nil"});return $v409;}else{break $case407;}}$case410:{const $v411=($v2&&$v2.$==="Con");if($v411){const $v412=$v2.head;const $v414=$v2.tail;return $v414;}else{break $case410;}}throw "bend: runtime fail-stop";}
function $b135($v2,$v3,$td=0){$case416:{const $v417=($v2&&$v2.$==="Nil");if($v417){return $v3;}else{break $case416;}}$case418:{const $v419=($v2&&$v2.$==="Con");if($v419){const $v420=$v2.head;const $v422=$v2.tail;return ($td<64?$b135($v422,$v420,$td+1):run_named2($b135,$v422,$v420,$td));}else{break $case418;}}throw "bend: runtime fail-stop";}
function $b136($v2,$td=0){$case425:{const $v426=($v2&&$v2.$==="Nil");if($v426){const $v427=({$:"None"});return $v427;}else{break $case425;}}$case428:{const $v429=($v2&&$v2.$==="Con");if($v429){const $v430=$v2.head;const $v432=$v2.tail;{const $a0=$v432,$a1=$v430;if($td<64){const $kb=$sp-0,$ki=$split_enter($k434,$kb);try{return $split_done($b135($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b135,2,$k434,$sp-0);}}else{break $case428;}}throw "bend: runtime fail-stop";}
function $k434($v434,$base,$td=0){const $v435=({$:"Some","value":$v434});return $v435;}
function $b137($v2,$v3,$td=0){$case436:{const $v437=($v2&&$v2.$==="Nil");if($v437){const $v439=({$:"None"});return $v439;}else{break $case436;}}$case440:{const $v441=($v2&&$v2.$==="Con");if($v441){const $v442=$v2.head;const $v444=$v2.tail;const $v446=$p_is_nat_zero($v3);if($v446){const $v447=({$:"Some","value":$v442});return $v447;}else{break $case440;}}else{break $case440;}}$case448:{const $v449=($v2&&$v2.$==="Con");if($v449){const $v450=$v2.head;const $v452=$v2.tail;const $v454=$p_is_nat_successor($v3);if($v454){const $v455=$p_nat_predecessor($v3);return ($td<64?$b137($v452,$v455,$td+1):run_named2($b137,$v452,$v455,$td));}else{break $case448;}}else{break $case448;}}throw "bend: runtime fail-stop";}
function $b138($v2,$v3,$v4,$td=0){$case458:{const $v459=($v2&&$v2.$==="Nil");if($v459){const $v461=({$:"Nil"});return $v461;}else{break $case458;}}$case462:{const $v463=($v2&&$v2.$==="Con");if($v463){const $v464=$v2.head;const $v466=$v2.tail;const $v468=$p_is_nat_zero($v3);if($v468){const $v469=({$:"Con","head":$v4,"tail":$v466});return $v469;}else{break $case462;}}else{break $case462;}}$case470:{const $v471=($v2&&$v2.$==="Con");if($v471){const $v472=$v2.head;const $v474=$v2.tail;const $v476=$p_is_nat_successor($v3);if($v476){const $v477=$p_nat_predecessor($v3);{const $a0=$v474,$a1=$v477,$a2=$v4;$stArgs[$sp++]=$v472;if($td<64){const $kb=$sp-1,$ki=$split_enter($k479,$kb);try{return $split_done($b138($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b138,3,$k479,$sp-1);}}else{break $case470;}}else{break $case470;}}throw "bend: runtime fail-stop";}
function $k479($v479,$base,$td=0){const $v472=$stArgs[$base+0];const $v480=({$:"Con","head":$v472,"tail":$v479});return $v480;}
function $b139($v2,$v3,$td=0){$case481:{const $v482=($v2&&$v2.$==="Nil");if($v482){const $v484=({$:"Nil"});return $v484;}else{break $case481;}}$case485:{const $v486=($v2&&$v2.$==="Con");if($v486){const $v487=$v2.head;const $v489=$v2.tail;const $v491=$p_is_nat_zero($v3);if($v491){const $v492=({$:"Nil"});return $v492;}else{break $case485;}}else{break $case485;}}$case493:{const $v494=($v2&&$v2.$==="Con");if($v494){const $v495=$v2.head;const $v497=$v2.tail;const $v499=$p_is_nat_successor($v3);if($v499){const $v500=$p_nat_predecessor($v3);{const $a0=$v497,$a1=$v500;$stArgs[$sp++]=$v495;if($td<64){const $kb=$sp-1,$ki=$split_enter($k502,$kb);try{return $split_done($b139($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b139,2,$k502,$sp-1);}}else{break $case493;}}else{break $case493;}}throw "bend: runtime fail-stop";}
function $k502($v502,$base,$td=0){const $v495=$stArgs[$base+0];const $v503=({$:"Con","head":$v495,"tail":$v502});return $v503;}
function $b140($v2,$v3,$td=0){$case504:{const $v505=($v2&&$v2.$==="Nil");if($v505){const $v507=({$:"Nil"});return $v507;}else{break $case504;}}$case508:{const $v509=($v2&&$v2.$==="Con");if($v509){const $v510=$v2.head;const $v512=$v2.tail;const $v514=$p_is_nat_zero($v3);if($v514){const $v515=({$:"Con","head":$v510,"tail":$v512});return $v515;}else{break $case508;}}else{break $case508;}}$case516:{const $v517=($v2&&$v2.$==="Con");if($v517){const $v518=$v2.head;const $v520=$v2.tail;const $v522=$p_is_nat_successor($v3);if($v522){const $v523=$p_nat_predecessor($v3);return ($td<64?$b140($v520,$v523,$td+1):run_named2($b140,$v520,$v523,$td));}else{break $case516;}}else{break $case516;}}throw "bend: runtime fail-stop";}
function $b141($v4,$v5,$td=0){$case526:{const $v527=($v4&&$v4.$==="Nil");if($v527){const $v529=({$:"Nil"});return $v529;}else{break $case526;}}$case530:{const $v531=($v4&&$v4.$==="Con");if($v531){const $v532=$v4.head;const $v534=$v4.tail;const $v536=($v5&&$v5.$==="Nil");if($v536){const $v537=({$:"Nil"});return $v537;}else{break $case530;}}else{break $case530;}}$case538:{const $v539=($v4&&$v4.$==="Con");if($v539){const $v540=$v4.head;const $v542=$v4.tail;const $v544=($v5&&$v5.$==="Con");if($v544){const $v545=$v5.head;const $v547=$v5.tail;const $v549=({$:"Tuple","fst":$v540,"snd":$v545});{const $a0=$v542,$a1=$v547;$stArgs[$sp++]=$v549;if($td<64){const $kb=$sp-1,$ki=$split_enter($k550,$kb);try{return $split_done($b141($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b141,2,$k550,$sp-1);}}else{break $case538;}}else{break $case538;}}throw "bend: runtime fail-stop";}
function $k550($v550,$base,$td=0){const $v549=$stArgs[$base+0];const $v551=({$:"Con","head":$v549,"tail":$v550});return $v551;}
function $b142($v0,$v1,$td=0){$case552:{const $v553=$p_is_nat_zero($v0);if($v553){return $v1;}else{break $case552;}}$case554:{const $v555=$p_is_nat_successor($v0);if($v555){const $v556=$p_nat_predecessor($v0);const $v558=({$:"Con","head":$v556,"tail":$v1});return ($td<64?$b142($v556,$v558,$td+1):run_named2($b142,$v556,$v558,$td));}else{break $case554;}}throw "bend: runtime fail-stop";}
function $b143($v0,$td=0){const $v560=({$:"Nil"});return ($td<64?$b142($v0,$v560,$td+1):run_named2($b142,$v0,$v560,$td));}
function $b144($v1,$v2,$td=0){$case562:{const $v563=$p_is_nat_zero($v1);if($v563){const $v564=({$:"Nil"});return $v564;}else{break $case562;}}$case565:{const $v566=$p_is_nat_successor($v1);if($v566){const $v567=$p_nat_predecessor($v1);{const $a0=$v567,$a1=$v2;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-1,$ki=$split_enter($k569,$kb);try{return $split_done($b144($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b144,2,$k569,$sp-1);}}else{break $case565;}}throw "bend: runtime fail-stop";}
function $k569($v569,$base,$td=0){const $v2=$stArgs[$base+0];const $v570=({$:"Con","head":$v2,"tail":$v569});return $v570;}
function $b145($v1,$v2,$v3,$td=0){$case571:{const $v572=$p_is_false($v3);if($v572){return $v2;}else{break $case571;}}$case573:{const $v574=$p_is_true($v3);if($v574){const $v575=({$:"Con","head":$v1,"tail":$v2});return $v575;}else{break $case573;}}throw "bend: runtime fail-stop";}
function $b146($v0,$v1,$td=0){$case576:{const $v577=$p_is_false($v1);if($v577){const $v578=({$:"Unit"});return run_tail($v0,$v578);}else{break $case576;}}$case580:{const $v581=$p_is_true($v1);if($v581){return true;}else{break $case580;}}throw "bend: runtime fail-stop";}
function $b147($v0,$v1,$td=0){$case582:{const $v583=$p_is_false($v1);if($v583){return false;}else{break $case582;}}$case584:{const $v585=$p_is_true($v1);if($v585){const $v586=({$:"Unit"});return run_tail($v0,$v586);}else{break $case584;}}throw "bend: runtime fail-stop";}
function $b148($v1,$v2,$v3,$td=0){$case588:{const $v589=$p_is_false($v3);if($v589){const $v590=({$:"Unit"});return run_tail($v2,$v590);}else{break $case588;}}$case592:{const $v593=$p_is_true($v3);if($v593){const $v594=({$:"Some","value":$v1});return $v594;}else{break $case592;}}throw "bend: runtime fail-stop";}
function $b149($v1,$v2,$v3,$v4,$v5,$v6,$td=0){$case595:{const $v596=$p_is_false($v6);if($v596){const $v597=({$:"Con","head":$v4,"tail":$v1});const $v598=({$:"Con","head":$v2,"tail":$v3});const $v599=({$:"Tuple","fst":$v598,"snd":$v5});const $v600=({$:"Tuple","fst":$v597,"snd":$v599});return $v600;}else{break $case595;}}$case601:{const $v602=$p_is_true($v6);if($v602){const $v603=({$:"Con","head":$v2,"tail":$v1});const $v604=({$:"Con","head":$v4,"tail":$v5});const $v605=({$:"Tuple","fst":$v3,"snd":$v604});const $v606=({$:"Tuple","fst":$v603,"snd":$v605});return $v606;}else{break $case601;}}throw "bend: runtime fail-stop";}
function $b150($v1,$td=0){$case607:{const $v608=($v1&&$v1.$==="Nil");if($v608){const $v609=({$:"Nil"});return $v609;}else{break $case607;}}$case610:{const $v611=($v1&&$v1.$==="Con");if($v611){const $v612=$v1.head;const $v614=$v1.tail;const $v616=({$:"Nil"});const $v617=({$:"Con","head":$v612,"tail":$v616});{const $a0=$v614;$stArgs[$sp++]=$v617;if($td<64){const $kb=$sp-1,$ki=$split_enter($k618,$kb);try{return $split_done($b150($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b150,1,$k618,$sp-1);}}else{break $case610;}}throw "bend: runtime fail-stop";}
function $k618($v618,$base,$td=0){const $v617=$stArgs[$base+0];const $v619=({$:"Con","head":$v617,"tail":$v618});return $v619;}
function $b151($v0,$td=0){$case620:{const $v621=$p_is_nat_zero($v0);if($v621){const $v622=({$:"WNil"});return $v622;}else{break $case620;}}$case623:{const $v624=$p_is_nat_successor($v0);if($v624){const $v625=$p_nat_predecessor($v0);{const $a0=$v625;if($td<64){const $kb=$sp-0,$ki=$split_enter($k627,$kb);try{return $split_done($b151($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b151,1,$k627,$sp-0);}}else{break $case623;}}throw "bend: runtime fail-stop";}
function $k627($v627,$base,$td=0){const $v628=({$:"WCon","head":false,"tail":$v627});return $v628;}
function $b454($c0,$v636,$td=0){$case637:{const $v638=($v636&&$v636.$==="WCon");if($v638){const $v639=$v636.head;const $v641=$v636.tail;{const $a0=$v639;$stArgs[$sp++]=$v641;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-2,$ki=$split_enter($k643,$kb);try{return $split_done($b80($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b80,1,$k643,$sp-2);}}else{break $case637;}}throw "bend: runtime fail-stop";}
function $k643($v643,$base,$td=0){const $v641=$stArgs[$base+0];const $c0=$stArgs[$base+1];{const $a0=$c0,$a1=$v641;$stArgs[$sp++]=$v643;if($td<64){const $kb=$sp-1,$ki=$split_enter($k644,$kb);try{return $split_done($b152($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b152,2,$k644,$sp-1);}}
function $k644($v644,$base,$td=0){const $v643=$stArgs[$base+0];const $v645=({$:"WCon","head":$v643,"tail":$v644});return $v645;}
function $b152($v0,$v1,$td=0){$case629:{const $v630=$p_is_nat_zero($v0);if($v630){const $v631=({$:"WNil"});return $v631;}else{break $case629;}}$case632:{const $v633=$p_is_nat_successor($v0);if($v633){const $v634=$p_nat_predecessor($v0);return ($td<64?$b454($v634,$v1,$td+1):run_named2($b454,$v634,$v1,$td));}else{break $case632;}}throw "bend: runtime fail-stop";}
function $b455($c0,$v654,$v655,$td=0){$case656:{const $v657=($v654&&$v654.$==="WCon");if($v657){const $v658=$v654.head;const $v660=$v654.tail;const $v662=($v655&&$v655.$==="WCon");if($v662){const $v663=$v655.head;const $v665=$v655.tail;{const $a0=$v658,$a1=$v663;$stArgs[$sp++]=$v660;$stArgs[$sp++]=$v665;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-3,$ki=$split_enter($k667,$kb);try{return $split_done($b81($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b81,2,$k667,$sp-3);}}else{break $case656;}}else{break $case656;}}throw "bend: runtime fail-stop";}
function $k667($v667,$base,$td=0){const $v660=$stArgs[$base+0];const $v665=$stArgs[$base+1];const $c0=$stArgs[$base+2];{const $a0=$c0,$a1=$v660,$a2=$v665;$stArgs[$sp++]=$v667;if($td<64){const $kb=$sp-1,$ki=$split_enter($k668,$kb);try{return $split_done($b153($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b153,3,$k668,$sp-1);}}
function $k668($v668,$base,$td=0){const $v667=$stArgs[$base+0];const $v669=({$:"WCon","head":$v667,"tail":$v668});return $v669;}
function $b153($v0,$v1,$v2,$td=0){$case647:{const $v648=$p_is_nat_zero($v0);if($v648){const $v649=({$:"WNil"});return $v649;}else{break $case647;}}$case650:{const $v651=$p_is_nat_successor($v0);if($v651){const $v652=$p_nat_predecessor($v0);return ($td<64?$b455($v652,$v1,$v2,$td+1):run_named3($b455,$v652,$v1,$v2,$td));}else{break $case650;}}throw "bend: runtime fail-stop";}
function $b456($c0,$v678,$v679,$td=0){$case680:{const $v681=($v678&&$v678.$==="WCon");if($v681){const $v682=$v678.head;const $v684=$v678.tail;const $v686=($v679&&$v679.$==="WCon");if($v686){const $v687=$v679.head;const $v689=$v679.tail;const $v691=$p_bool_or($v682,$v687);{const $a0=$c0,$a1=$v684,$a2=$v689;$stArgs[$sp++]=$v691;if($td<64){const $kb=$sp-1,$ki=$split_enter($k692,$kb);try{return $split_done($b154($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b154,3,$k692,$sp-1);}}else{break $case680;}}else{break $case680;}}throw "bend: runtime fail-stop";}
function $k692($v692,$base,$td=0){const $v691=$stArgs[$base+0];const $v693=({$:"WCon","head":$v691,"tail":$v692});return $v693;}
function $b154($v0,$v1,$v2,$td=0){$case671:{const $v672=$p_is_nat_zero($v0);if($v672){const $v673=({$:"WNil"});return $v673;}else{break $case671;}}$case674:{const $v675=$p_is_nat_successor($v0);if($v675){const $v676=$p_nat_predecessor($v0);return ($td<64?$b456($v676,$v1,$v2,$td+1):run_named3($b456,$v676,$v1,$v2,$td));}else{break $case674;}}throw "bend: runtime fail-stop";}
function $b457($c0,$v702,$v703,$td=0){$case704:{const $v705=($v702&&$v702.$==="WCon");if($v705){const $v706=$v702.head;const $v708=$v702.tail;const $v710=($v703&&$v703.$==="WCon");if($v710){const $v711=$v703.head;const $v713=$v703.tail;const $v715=$p_bool_xor($v706,$v711);{const $a0=$c0,$a1=$v708,$a2=$v713;$stArgs[$sp++]=$v715;if($td<64){const $kb=$sp-1,$ki=$split_enter($k716,$kb);try{return $split_done($b155($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b155,3,$k716,$sp-1);}}else{break $case704;}}else{break $case704;}}throw "bend: runtime fail-stop";}
function $k716($v716,$base,$td=0){const $v715=$stArgs[$base+0];const $v717=({$:"WCon","head":$v715,"tail":$v716});return $v717;}
function $b155($v0,$v1,$v2,$td=0){$case695:{const $v696=$p_is_nat_zero($v0);if($v696){const $v697=({$:"WNil"});return $v697;}else{break $case695;}}$case698:{const $v699=$p_is_nat_successor($v0);if($v699){const $v700=$p_nat_predecessor($v0);return ($td<64?$b457($v700,$v1,$v2,$td+1):run_named3($b457,$v700,$v1,$v2,$td));}else{break $case698;}}throw "bend: runtime fail-stop";}
function $b458($c0,$c1,$v726,$td=0){$case727:{const $v728=($v726&&$v726.$==="WCon");if($v728){const $v729=$v726.head;const $v731=$v726.tail;{const $a0=$c1,$a1=$v729,$a2=$v731;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k733,$kb);try{return $split_done($b156($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b156,3,$k733,$sp-1);}}else{break $case727;}}throw "bend: runtime fail-stop";}
function $k733($v733,$base,$td=0){const $c0=$stArgs[$base+0];const $v734=({$:"WCon","head":$c0,"tail":$v733});return $v734;}
function $b156($v0,$v1,$v2,$td=0){$case719:{const $v720=$p_is_nat_zero($v0);if($v720){const $v721=({$:"WNil"});return $v721;}else{break $case719;}}$case722:{const $v723=$p_is_nat_successor($v0);if($v723){const $v724=$p_nat_predecessor($v0);return ($td<64?$b458($v1,$v724,$v2,$td+1):run_named3($b458,$v1,$v724,$v2,$td));}else{break $case722;}}throw "bend: runtime fail-stop";}
function $b459($c0,$v743,$td=0){$case744:{const $v745=($v743&&$v743.$==="WCon");if($v745){const $v746=$v743.head;const $v748=$v743.tail;{const $a0=$c0,$a1=$v746,$a2=$v748;if($td<64){const $kb=$sp-0,$ki=$split_enter($k750,$kb);try{return $split_done($b156($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b156,3,$k750,$sp-0);}}else{break $case744;}}throw "bend: runtime fail-stop";}
function $k750($v750,$base,$td=0){const $v751=({$:"WCon","head":false,"tail":$v750});return $v751;}
function $b157($v0,$v1,$td=0){$case736:{const $v737=$p_is_nat_zero($v0);if($v737){const $v738=({$:"WNil"});return $v738;}else{break $case736;}}$case739:{const $v740=$p_is_nat_successor($v0);if($v740){const $v741=$p_nat_predecessor($v0);return ($td<64?$b459($v741,$v1,$td+1):run_named2($b459,$v741,$v1,$td));}else{break $case739;}}throw "bend: runtime fail-stop";}
function $b158($v1,$v2,$td=0){$case753:{const $v754=($v2&&$v2.$==="Tuple");if($v754){const $v755=$v2.fst;const $v757=$v2.snd;const $v759=({$:"WCon","head":$v1,"tail":$v757});const $v760=({$:"Tuple","fst":$v755,"snd":$v759});return $v760;}else{break $case753;}}throw "bend: runtime fail-stop";}
function $b460($c0,$c1,$v769,$td=0){$case770:{const $v771=($v769&&$v769.$==="WCon");if($v771){const $v772=$v769.head;const $v774=$v769.tail;{const $a0=$c1,$a1=$v772,$a2=$v774;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k776,$kb);try{return $split_done($b159($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b159,3,$k776,$sp-1);}}else{break $case770;}}throw "bend: runtime fail-stop";}
function $k776($v776,$base,$td=0){const $c0=$stArgs[$base+0];return ($td<64?$b158($c0,$v776,$td+1):run_named2($b158,$c0,$v776,$td));}
function $b159($v0,$v1,$v2,$td=0){$case761:{const $v762=$p_is_nat_zero($v0);if($v762){const $v763=({$:"WNil"});const $v764=({$:"Tuple","fst":$v1,"snd":$v763});return $v764;}else{break $case761;}}$case765:{const $v766=$p_is_nat_successor($v0);if($v766){const $v767=$p_nat_predecessor($v0);return ($td<64?$b460($v1,$v767,$v2,$td+1):run_named3($b460,$v1,$v767,$v2,$td));}else{break $case765;}}throw "bend: runtime fail-stop";}
function $b461($c0,$v786,$td=0){$case787:{const $v788=($v786&&$v786.$==="WCon");if($v788){const $v789=$v786.head;const $v791=$v786.tail;{const $a0=$c0,$a1=$v791;$stArgs[$sp++]=$v789;if($td<64){const $kb=$sp-1,$ki=$split_enter($k793,$kb);try{return $split_done($b160($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b160,2,$k793,$sp-1);}}else{break $case787;}}throw "bend: runtime fail-stop";}
function $k793($v793,$base,$td=0){const $v789=$stArgs[$base+0];const $v794=({$:"WCon","head":$v789,"tail":$v793});return $v794;}
function $b160($v0,$v1,$td=0){$case779:{const $v780=$p_is_nat_zero($v0);if($v780){const $v781=({$:"WCon","head":false,"tail":$v1});return $v781;}else{break $case779;}}$case782:{const $v783=$p_is_nat_successor($v0);if($v783){const $v784=$p_nat_predecessor($v0);return ($td<64?$b461($v784,$v1,$td+1):run_named2($b461,$v784,$v1,$td));}else{break $case782;}}throw "bend: runtime fail-stop";}
function $b462($c0,$v803,$td=0){$case804:{const $v805=($v803&&$v803.$==="WCon");if($v805){const $v806=$v803.head;const $v808=$v803.tail;return ($td<64?$b160($c0,$v808,$td+1):run_named2($b160,$c0,$v808,$td));}else{break $case804;}}throw "bend: runtime fail-stop";}
function $b161($v0,$v1,$td=0){$case796:{const $v797=$p_is_nat_zero($v0);if($v797){const $v798=({$:"WNil"});return $v798;}else{break $case796;}}$case799:{const $v800=$p_is_nat_successor($v0);if($v800){const $v801=$p_nat_predecessor($v0);return ($td<64?$b462($v801,$v1,$td+1):run_named2($b462,$v801,$v1,$td));}else{break $case799;}}throw "bend: runtime fail-stop";}
function $b162($v0,$v1,$v2,$td=0){switch($v2?.$){case "LT":{$case812:{const $v813=true;const $v814=({$:"LT"});return $v814;}break;}case "EQ":{$case815:{const $v816=true;return ($td<64?$b84($v0,$v1,$td+1):run_named2($b84,$v0,$v1,$td));}break;}case "GT":{$case818:{const $v819=true;const $v820=({$:"GT"});return $v820;}break;}}throw "bend: runtime fail-stop";}
function $b463($c0,$v828,$v829,$td=0){$case830:{const $v831=($v828&&$v828.$==="WCon");if($v831){const $v832=$v828.head;const $v834=$v828.tail;const $v836=($v829&&$v829.$==="WCon");if($v836){const $v837=$v829.head;const $v839=$v829.tail;{const $a0=$c0,$a1=$v834,$a2=$v839;$stArgs[$sp++]=$v832;$stArgs[$sp++]=$v837;if($td<64){const $kb=$sp-2,$ki=$split_enter($k841,$kb);try{return $split_done($b163($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b163,3,$k841,$sp-2);}}else{break $case830;}}else{break $case830;}}throw "bend: runtime fail-stop";}
function $k841($v841,$base,$td=0){const $v832=$stArgs[$base+0];const $v837=$stArgs[$base+1];return ($td<64?$b162($v832,$v837,$v841,$td+1):run_named3($b162,$v832,$v837,$v841,$td));}
function $b163($v0,$v1,$v2,$td=0){$case821:{const $v822=$p_is_nat_zero($v0);if($v822){const $v823=({$:"EQ"});return $v823;}else{break $case821;}}$case824:{const $v825=$p_is_nat_successor($v0);if($v825){const $v826=$p_nat_predecessor($v0);return ($td<64?$b463($v826,$v1,$v2,$td+1):run_named3($b463,$v826,$v1,$v2,$td));}else{break $case824;}}throw "bend: runtime fail-stop";}
function $b464($c0,$v851,$td=0){$case852:{const $v853=($v851&&$v851.$==="WCon");if($v853){const $v854=$v851.head;const $v855=$p_is_false($v854);if($v855){const $v856=$v851.tail;const $v858=({$:"WCon","head":true,"tail":$v856});return $v858;}else{break $case852;}}else{break $case852;}}$case859:{const $v860=($v851&&$v851.$==="WCon");if($v860){const $v861=$v851.head;const $v862=$p_is_true($v861);if($v862){const $v863=$v851.tail;{const $a0=$c0,$a1=$v863;if($td<64){const $kb=$sp-0,$ki=$split_enter($k865,$kb);try{return $split_done($b164($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b164,2,$k865,$sp-0);}}else{break $case859;}}else{break $case859;}}throw "bend: runtime fail-stop";}
function $k865($v865,$base,$td=0){const $v866=({$:"WCon","head":false,"tail":$v865});return $v866;}
function $b164($v0,$v1,$td=0){$case844:{const $v845=$p_is_nat_zero($v0);if($v845){const $v846=({$:"WNil"});return $v846;}else{break $case844;}}$case847:{const $v848=$p_is_nat_successor($v0);if($v848){const $v849=$p_nat_predecessor($v0);return ($td<64?$b464($v849,$v1,$td+1):run_named2($b464,$v849,$v1,$td));}else{break $case847;}}throw "bend: runtime fail-stop";}
function $b165($v0,$v1,$v2,$v3,$v4,$td=0){$case868:{const $v869=($v4&&$v4.$==="Tuple");if($v869){const $v870=$v4.fst;const $v872=$v4.snd;{const $a0=$v0,$a1=$v1,$a2=$v2,$a3=$v3,$a4=$v872;$stArgs[$sp++]=$v870;if($td<64){const $kb=$sp-1,$ki=$split_enter($k874,$kb);try{return $split_done($b166($a0,$a1,$a2,$a3,$a4,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;$tailArgs[4]=$a4;return $split($b166,5,$k874,$sp-1);}}else{break $case868;}}throw "bend: runtime fail-stop";}
function $k874($v874,$base,$td=0){const $v870=$stArgs[$base+0];const $v875=({$:"WCon","head":$v870,"tail":$v874});return $v875;}
function $b465($c0,$c1,$v883,$v884,$v885,$td=0){$case886:{const $v887=($v883&&$v883.$==="WCon");if($v887){const $v888=$v883.head;const $v890=$v883.tail;const $v892=($v884&&$v884.$==="WCon");if($v892){const $v893=$v884.head;const $v895=$v884.tail;const $v897=$p_is_false($v885);if($v897){{const $a0=$v888,$a1=$v893,$a2=$c1;$stArgs[$sp++]=$v890;$stArgs[$sp++]=$v895;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-3,$ki=$split_enter($k898,$kb);try{return $split_done($b85($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b85,3,$k898,$sp-3);}}else{break $case886;}}else{break $case886;}}else{break $case886;}}$case900:{const $v901=($v883&&$v883.$==="WCon");if($v901){const $v902=$v883.head;const $v904=$v883.tail;const $v906=($v884&&$v884.$==="WCon");if($v906){const $v907=$v884.head;const $v909=$v884.tail;const $v911=$p_is_true($v885);if($v911){{const $a0=$v907;$stArgs[$sp++]=$v902;$stArgs[$sp++]=$v904;$stArgs[$sp++]=$v909;$stArgs[$sp++]=$c1;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-5,$ki=$split_enter($k912,$kb);try{return $split_done($b80($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b80,1,$k912,$sp-5);}}else{break $case900;}}else{break $case900;}}else{break $case900;}}throw "bend: runtime fail-stop";}
function $k898($v898,$base,$td=0){const $v890=$stArgs[$base+0];const $v895=$stArgs[$base+1];const $c0=$stArgs[$base+2];return ($td<64?$b165($c0,$v890,$v895,false,$v898,$td+1):run_named5($b165,$c0,$v890,$v895,false,$v898,$td));}
function $k912($v912,$base,$td=0){const $v902=$stArgs[$base+0];const $v904=$stArgs[$base+1];const $v909=$stArgs[$base+2];const $c1=$stArgs[$base+3];const $c0=$stArgs[$base+4];{const $a0=$v902,$a1=$v912,$a2=$c1;$stArgs[$sp++]=$v904;$stArgs[$sp++]=$v909;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-3,$ki=$split_enter($k913,$kb);try{return $split_done($b85($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b85,3,$k913,$sp-3);}}
function $k913($v913,$base,$td=0){const $v904=$stArgs[$base+0];const $v909=$stArgs[$base+1];const $c0=$stArgs[$base+2];return ($td<64?$b165($c0,$v904,$v909,true,$v913,$td+1):run_named5($b165,$c0,$v904,$v909,true,$v913,$td));}
function $b166($v0,$v1,$v2,$v3,$v4,$td=0){$case876:{const $v877=$p_is_nat_zero($v0);if($v877){const $v878=({$:"WNil"});return $v878;}else{break $case876;}}$case879:{const $v880=$p_is_nat_successor($v0);if($v880){const $v881=$p_nat_predecessor($v0);return ($td<64?$b465($v881,$v4,$v1,$v2,$v3,$td+1):run_named5($b465,$v881,$v4,$v1,$v2,$v3,$td));}else{break $case879;}}throw "bend: runtime fail-stop";}
function $b167($v0,$v1,$v2,$td=0){return ($td<64?$b166($v0,$v1,$v2,false,false,$td+1):run_named5($b166,$v0,$v1,$v2,false,false,$td));}
function $b168($v0,$v1,$v2,$td=0){return ($td<64?$b166($v0,$v1,$v2,true,true,$td+1):run_named5($b166,$v0,$v1,$v2,true,true,$td));}
function $b169($v0,$v1,$v2,$v3,$td=0){{const $a0=$v0,$a1=$v1,$a2=$v2,$a3=$v3;if($td<64){const $kb=$sp-0,$ki=$split_enter($k918,$kb);try{return $split_done($b170($a0,$a1,$a2,$a3,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;return $split($b170,4,$k918,$sp-0);}}
function $k918($v918,$base,$td=0){return ($td<64?$b76($v918,$td+1):run_named1($b76,$v918,$td));}
function $b466($v922,$v923,$td=0){$case924:{const $v925=($v922&&$v922.$==="WNil");if($v925){const $v926=($v923&&$v923.$==="WNil");if($v926){return null;}else{break $case924;}}else{break $case924;}}throw "bend: runtime fail-stop";}
function $b467($c0,$v932,$v933,$v934,$td=0){$case935:{const $v936=($v932&&$v932.$==="WCon");if($v936){const $v937=$v932.head;const $v938=$p_is_false($v937);if($v938){const $v939=$v932.tail;const $v941=($v933&&$v933.$==="WCon");if($v941){const $v942=$v933.head;const $v943=$p_is_false($v942);if($v943){const $v944=$v933.tail;const $v946=$p_is_false($v934);if($v946){return ($td<64?$b169($c0,$v939,$v944,false,$td+1):run_named4($b169,$c0,$v939,$v944,false,$td));}else{break $case935;}}else{break $case935;}}else{break $case935;}}else{break $case935;}}else{break $case935;}}$case948:{const $v949=($v932&&$v932.$==="WCon");if($v949){const $v950=$v932.head;const $v951=$p_is_false($v950);if($v951){const $v952=$v932.tail;const $v954=($v933&&$v933.$==="WCon");if($v954){const $v955=$v933.head;const $v956=$p_is_false($v955);if($v956){const $v957=$v933.tail;const $v959=$p_is_true($v934);if($v959){return ($td<64?$b169($c0,$v952,$v957,false,$td+1):run_named4($b169,$c0,$v952,$v957,false,$td));}else{break $case948;}}else{break $case948;}}else{break $case948;}}else{break $case948;}}else{break $case948;}}$case961:{const $v962=($v932&&$v932.$==="WCon");if($v962){const $v963=$v932.head;const $v964=$p_is_false($v963);if($v964){const $v965=$v932.tail;const $v967=($v933&&$v933.$==="WCon");if($v967){const $v968=$v933.head;const $v969=$p_is_true($v968);if($v969){const $v970=$v933.tail;const $v972=$p_is_false($v934);if($v972){return ($td<64?$b169($c0,$v965,$v970,false,$td+1):run_named4($b169,$c0,$v965,$v970,false,$td));}else{break $case961;}}else{break $case961;}}else{break $case961;}}else{break $case961;}}else{break $case961;}}$case974:{const $v975=($v932&&$v932.$==="WCon");if($v975){const $v976=$v932.head;const $v977=$p_is_false($v976);if($v977){const $v978=$v932.tail;const $v980=($v933&&$v933.$==="WCon");if($v980){const $v981=$v933.head;const $v982=$p_is_true($v981);if($v982){const $v983=$v933.tail;const $v985=$p_is_true($v934);if($v985){return ($td<64?$b169($c0,$v978,$v983,true,$td+1):run_named4($b169,$c0,$v978,$v983,true,$td));}else{break $case974;}}else{break $case974;}}else{break $case974;}}else{break $case974;}}else{break $case974;}}$case987:{const $v988=($v932&&$v932.$==="WCon");if($v988){const $v989=$v932.head;const $v990=$p_is_true($v989);if($v990){const $v991=$v932.tail;const $v993=($v933&&$v933.$==="WCon");if($v993){const $v994=$v933.head;const $v995=$p_is_false($v994);if($v995){const $v996=$v933.tail;const $v998=$p_is_false($v934);if($v998){return ($td<64?$b169($c0,$v991,$v996,false,$td+1):run_named4($b169,$c0,$v991,$v996,false,$td));}else{break $case987;}}else{break $case987;}}else{break $case987;}}else{break $case987;}}else{break $case987;}}$case1000:{const $v1001=($v932&&$v932.$==="WCon");if($v1001){const $v1002=$v932.head;const $v1003=$p_is_true($v1002);if($v1003){const $v1004=$v932.tail;const $v1006=($v933&&$v933.$==="WCon");if($v1006){const $v1007=$v933.head;const $v1008=$p_is_false($v1007);if($v1008){const $v1009=$v933.tail;const $v1011=$p_is_true($v934);if($v1011){return ($td<64?$b169($c0,$v1004,$v1009,true,$td+1):run_named4($b169,$c0,$v1004,$v1009,true,$td));}else{break $case1000;}}else{break $case1000;}}else{break $case1000;}}else{break $case1000;}}else{break $case1000;}}$case1013:{const $v1014=($v932&&$v932.$==="WCon");if($v1014){const $v1015=$v932.head;const $v1016=$p_is_true($v1015);if($v1016){const $v1017=$v932.tail;const $v1019=($v933&&$v933.$==="WCon");if($v1019){const $v1020=$v933.head;const $v1021=$p_is_true($v1020);if($v1021){const $v1022=$v933.tail;const $v1024=$p_is_false($v934);if($v1024){return ($td<64?$b169($c0,$v1017,$v1022,true,$td+1):run_named4($b169,$c0,$v1017,$v1022,true,$td));}else{break $case1013;}}else{break $case1013;}}else{break $case1013;}}else{break $case1013;}}else{break $case1013;}}$case1026:{const $v1027=($v932&&$v932.$==="WCon");if($v1027){const $v1028=$v932.head;const $v1029=$p_is_true($v1028);if($v1029){const $v1030=$v932.tail;const $v1032=($v933&&$v933.$==="WCon");if($v1032){const $v1033=$v933.head;const $v1034=$p_is_true($v1033);if($v1034){const $v1035=$v933.tail;const $v1037=$p_is_true($v934);if($v1037){return ($td<64?$b169($c0,$v1030,$v1035,true,$td+1):run_named4($b169,$c0,$v1030,$v1035,true,$td));}else{break $case1026;}}else{break $case1026;}}else{break $case1026;}}else{break $case1026;}}else{break $case1026;}}throw "bend: runtime fail-stop";}
function $b170($v0,$v1,$v2,$v3,$td=0){$case920:{const $v921=$p_is_nat_zero($v0);if($v921){return ($td<64?$b466($v1,$v2,$td+1):run_named2($b466,$v1,$v2,$td));}else{break $case920;}}$case928:{const $v929=$p_is_nat_successor($v0);if($v929){const $v930=$p_nat_predecessor($v0);return ($td<64?$b467($v930,$v1,$v2,$v3,$td+1):run_named4($b467,$v930,$v1,$v2,$v3,$td));}else{break $case928;}}throw "bend: runtime fail-stop";}
function $b171($v0,$v1,$v2,$td=0){return ($td<64?$b170($v0,$v1,$v2,false,$td+1):run_named4($b170,$v0,$v1,$v2,false,$td));}
function $b468($c0,$v1047,$td=0){$case1048:{const $v1049=($v1047&&$v1047.$==="WCon");if($v1049){const $v1050=$v1047.head;const $v1051=$p_is_false($v1050);if($v1051){const $v1052=$v1047.tail;{const $a0=$c0,$a1=$v1052;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1054,$kb);try{return $split_done($b172($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b172,2,$k1054,$sp-0);}}else{break $case1048;}}else{break $case1048;}}$case1056:{const $v1057=($v1047&&$v1047.$==="WCon");if($v1057){const $v1058=$v1047.head;const $v1059=$p_is_true($v1058);if($v1059){const $v1060=$v1047.tail;{const $a0=$c0,$a1=$v1060;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1062,$kb);try{return $split_done($b172($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b172,2,$k1062,$sp-0);}}else{break $case1056;}}else{break $case1056;}}throw "bend: runtime fail-stop";}
function $k1054($v1054,$base,$td=0){const $v1055=$p_nat_double($v1054);return $v1055;}
function $k1062($v1062,$base,$td=0){const $v1063=$p_nat_double($v1062);const $v1064=$p_nat_successor($v1063);return $v1064;}
function $b172($v0,$v1,$td=0){$case1041:{const $v1042=$p_is_nat_zero($v0);if($v1042){return 0;}else{break $case1041;}}$case1043:{const $v1044=$p_is_nat_successor($v0);if($v1044){const $v1045=$p_nat_predecessor($v0);return ($td<64?$b468($v1045,$v1,$td+1):run_named2($b468,$v1045,$v1,$td));}else{break $case1043;}}throw "bend: runtime fail-stop";}
function $b469($c0,$c1,$c2,$c3,$v1072,$td=0){$case1073:{const $v1074=($v1072&&$v1072.$==="WCon");if($v1074){const $v1075=$v1072.head;const $v1076=$p_is_false($v1075);if($v1076){const $v1077=$v1072.tail;{const $a0=$c0,$a1=$c2;$stArgs[$sp++]=$v1077;$stArgs[$sp++]=$c0;$stArgs[$sp++]=$c1;$stArgs[$sp++]=$c3;if($td<64){const $kb=$sp-4,$ki=$split_enter($k1079,$kb);try{return $split_done($b157($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b157,2,$k1079,$sp-4);}}else{break $case1073;}}else{break $case1073;}}$case1081:{const $v1082=($v1072&&$v1072.$==="WCon");if($v1082){const $v1083=$v1072.head;const $v1084=$p_is_true($v1083);if($v1084){const $v1085=$v1072.tail;{const $a0=$c0,$a1=$c2;$stArgs[$sp++]=$v1085;$stArgs[$sp++]=$c3;$stArgs[$sp++]=$c2;$stArgs[$sp++]=$c0;$stArgs[$sp++]=$c1;if($td<64){const $kb=$sp-5,$ki=$split_enter($k1087,$kb);try{return $split_done($b157($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b157,2,$k1087,$sp-5);}}else{break $case1081;}}else{break $case1081;}}throw "bend: runtime fail-stop";}
function $k1079($v1079,$base,$td=0){const $v1077=$stArgs[$base+0];const $c0=$stArgs[$base+1];const $c1=$stArgs[$base+2];const $c3=$stArgs[$base+3];return ($td<64?$b173($c0,$c1,$v1077,$v1079,$c3,$td+1):run_named5($b173,$c0,$c1,$v1077,$v1079,$c3,$td));}
function $k1087($v1087,$base,$td=0){const $v1085=$stArgs[$base+0];const $c3=$stArgs[$base+1];const $c2=$stArgs[$base+2];const $c0=$stArgs[$base+3];const $c1=$stArgs[$base+4];{const $a0=$c0,$a1=$c3,$a2=$c2;$stArgs[$sp++]=$v1085;$stArgs[$sp++]=$v1087;$stArgs[$sp++]=$c0;$stArgs[$sp++]=$c1;if($td<64){const $kb=$sp-4,$ki=$split_enter($k1088,$kb);try{return $split_done($b167($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b167,3,$k1088,$sp-4);}}
function $k1088($v1088,$base,$td=0){const $v1085=$stArgs[$base+0];const $v1087=$stArgs[$base+1];const $c0=$stArgs[$base+2];const $c1=$stArgs[$base+3];return ($td<64?$b173($c0,$c1,$v1085,$v1087,$v1088,$td+1):run_named5($b173,$c0,$c1,$v1085,$v1087,$v1088,$td));}
function $b173($v0,$v1,$v2,$v3,$v4,$td=0){$case1066:{const $v1067=$p_is_nat_zero($v1);if($v1067){return $v4;}else{break $case1066;}}$case1068:{const $v1069=$p_is_nat_successor($v1);if($v1069){const $v1070=$p_nat_predecessor($v1);return ($td<64?$b469($v0,$v1070,$v3,$v4,$v2,$td+1):run_named5($b469,$v0,$v1070,$v3,$v4,$v2,$td));}else{break $case1068;}}throw "bend: runtime fail-stop";}
function $b174($v0,$v1,$v2,$td=0){{const $a0=$v0;$stArgs[$sp++]=$v0;$stArgs[$sp++]=$v1;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-3,$ki=$split_enter($k1091,$kb);try{return $split_done($b151($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b151,1,$k1091,$sp-3);}}
function $k1091($v1091,$base,$td=0){const $v0=$stArgs[$base+0];const $v1=$stArgs[$base+1];const $v2=$stArgs[$base+2];return ($td<64?$b173($v0,$v0,$v1,$v2,$v1091,$td+1):run_named5($b173,$v0,$v0,$v1,$v2,$v1091,$td));}
function $b177($v0,$v1,$td=0){$case1093:{const $v1094=$p_u32_to_word($v0);const $v1096=$p_u32_to_word($v1);{const $a0=32,$a1=$v1094,$a2=$v1096;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1098,$kb);try{return $split_done($b171($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b171,3,$k1098,$sp-0);}}throw "bend: runtime fail-stop";}
function $k1098($v1098,$base,$td=0){return ($td<64?$b76($v1098,$td+1):run_named1($b76,$v1098,$td));}
function $b198($v0,$v1,$v2,$td=0){$case1100:{const $v1101=$p_is_nat_zero($v0);if($v1101){return $v2;}else{break $case1100;}}$case1102:{const $v1103=$p_is_nat_successor($v0);if($v1103){const $v1104=$p_nat_predecessor($v0);const $v1106=$p_u32_shln(1,$v1104);const $v1107=$p_u32_to_nat($v1106);const $v1109=$p_u32_shrn($v1,$v1107);const $v1110=$p_u32_is_ne($v1109,0);{const $a0=$v1110;$stArgs[$sp++]=$v1107;$stArgs[$sp++]=$v1;$stArgs[$sp++]=$v2;$stArgs[$sp++]=$v1104;if($td<64){const $kb=$sp-4,$ki=$split_enter($k1111,$kb);try{return $split_done($b87($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b87,1,$k1111,$sp-4);}}else{break $case1102;}}throw "bend: runtime fail-stop";}
function $k1111($v1111,$base,$td=0){const $v1107=$stArgs[$base+0];const $v1=$stArgs[$base+1];const $v2=$stArgs[$base+2];const $v1104=$stArgs[$base+3];const $v1112=$p_u32_to_nat($v1111);const $v1113=$p_nat_mul($v1107,$v1112);const $v1115=$p_u32_shrn($v1,$v1113);const $v1116=$p_nat_add($v2,$v1113);return ($td<64?$b198($v1104,$v1115,$v1116,$td+1):run_named3($b198,$v1104,$v1115,$v1116,$td));}
function $b199($v0,$td=0){return ($td<64?$b198(5,$v0,0,$td+1):run_named3($b198,5,$v0,0,$td));}
function $b200($v1,$v2,$v3,$v4,$td=0){$case1119:{const $v1120=$p_is_true($v4);if($v1120){const $v1121=({$:"WCon","head":true,"tail":$v1});const $v1122=$p_u32_sub($v2,$v3);const $v1123=({$:"Tuple","fst":$v1121,"snd":$v1122});return $v1123;}else{break $case1119;}}$case1124:{const $v1125=$p_is_false($v4);if($v1125){const $v1126=({$:"WCon","head":false,"tail":$v1});const $v1127=({$:"Tuple","fst":$v1126,"snd":$v2});return $v1127;}else{break $case1124;}}throw "bend: runtime fail-stop";}
function $b201($v1,$v2,$v3,$td=0){$case1128:{const $v1129=($v3&&$v3.$==="Tuple");if($v1129){const $v1130=$v3.fst;const $v1132=$v3.snd;const $v1134=$p_word_to_u32($v1132);const $v1136=$p_u32_is_ge($v1134,$v2);const $v1137=$p_bool_or($v1130,$v1136);return ($td<64?$b200($v1,$v1134,$v2,$v1137,$td+1):run_named4($b200,$v1,$v1134,$v2,$v1137,$td));}else{break $case1128;}}throw "bend: runtime fail-stop";}
function $b470($c0,$c1,$c2,$v1145,$td=0){$case1146:{const $v1147=$p_u32_to_word($v1145);{const $a0=32,$a1=$c2,$a2=$v1147;$stArgs[$sp++]=$c0;$stArgs[$sp++]=$c1;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1149,$kb);try{return $split_done($b159($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b159,3,$k1149,$sp-2);}}throw "bend: runtime fail-stop";}
function $k1149($v1149,$base,$td=0){const $c0=$stArgs[$base+0];const $c1=$stArgs[$base+1];return ($td<64?$b201($c0,$c1,$v1149,$td+1):run_named3($b201,$c0,$c1,$v1149,$td));}
function $b202($v1,$v2,$v3,$td=0){$case1139:{const $v1140=($v3&&$v3.$==="Tuple");if($v1140){const $v1141=$v3.fst;const $v1143=$v3.snd;return ($td<64?$b470($v1141,$v2,$v1,$v1143,$td+1):run_named4($b470,$v1141,$v2,$v1,$v1143,$td));}else{break $case1139;}}throw "bend: runtime fail-stop";}
function $b203($v0,$v1,$v2,$td=0){$case1152:{const $v1153=$p_is_nat_zero($v0);if($v1153){const $v1154=($v1&&$v1.$==="WNil");if($v1154){const $v1155=({$:"WNil"});const $v1156=({$:"Tuple","fst":$v1155,"snd":0});return $v1156;}else{break $case1152;}}else{break $case1152;}}$case1157:{const $v1158=$p_is_nat_successor($v0);if($v1158){const $v1159=$p_nat_predecessor($v0);const $v1161=($v1&&$v1.$==="WCon");if($v1161){const $v1162=$v1.head;const $v1164=$v1.tail;{const $a0=$v1159,$a1=$v1164,$a2=$v2;$stArgs[$sp++]=$v1162;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1166,$kb);try{return $split_done($b203($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b203,3,$k1166,$sp-2);}}else{break $case1157;}}else{break $case1157;}}throw "bend: runtime fail-stop";}
function $k1166($v1166,$base,$td=0){const $v1162=$stArgs[$base+0];const $v2=$stArgs[$base+1];return ($td<64?$b202($v1162,$v2,$v1166,$td+1):run_named3($b202,$v1162,$v2,$v1166,$td));}
function $b204($v0,$td=0){$case1168:{const $v1169=($v0&&$v0.$==="Tuple");if($v1169){const $v1170=$v0.fst;const $v1172=$v0.snd;const $v1174=$p_word_to_u32($v1170);return $v1174;}else{break $case1168;}}throw "bend: runtime fail-stop";}
function $b205($v0,$v1,$v2,$td=0){$case1175:{const $v1176=$p_is_true($v2);if($v1176){return 0;}else{break $case1175;}}$case1177:{const $v1178=$p_is_false($v2);if($v1178){{const $a0=32,$a1=$v0,$a2=$v1;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1179,$kb);try{return $split_done($b203($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b203,3,$k1179,$sp-0);}}else{break $case1177;}}throw "bend: runtime fail-stop";}
function $k1179($v1179,$base,$td=0){return ($td<64?$b204($v1179,$td+1):run_named1($b204,$v1179,$td));}
function $b207($v0,$td=0){$case1181:{const $v1182=($v0&&$v0.$==="Tuple");if($v1182){const $v1183=$v0.fst;const $v1185=$v0.snd;return $v1185;}else{break $case1181;}}throw "bend: runtime fail-stop";}
function $b208($v0,$v1,$v2,$td=0){$case1187:{const $v1188=$p_is_true($v2);if($v1188){const $v1189=$p_word_to_u32($v0);return $v1189;}else{break $case1187;}}$case1190:{const $v1191=$p_is_false($v2);if($v1191){{const $a0=32,$a1=$v0,$a2=$v1;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1192,$kb);try{return $split_done($b203($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b203,3,$k1192,$sp-0);}}else{break $case1190;}}throw "bend: runtime fail-stop";}
function $k1192($v1192,$base,$td=0){return ($td<64?$b207($v1192,$td+1):run_named1($b207,$v1192,$td));}
function $b210($v0,$v1,$td=0){$case1194:{const $v1195=$p_u32_to_word($v0);const $v1197=$p_u32_to_word($v1);const $v1199=$p_word_to_u32($v1195);const $v1200=$p_word_to_u32($v1197);const $v1201=$p_u32_is_lt($v1199,$v1200);const $v1202=$p_word_to_u32($v1195);const $v1203=$p_word_to_u32($v1197);return ($td<64?$b86($v1201,$v1202,$v1203,$td+1):run_named3($b86,$v1201,$v1202,$v1203,$td));}throw "bend: runtime fail-stop";}
function $b211($v0,$v1,$td=0){$case1205:{const $v1206=$p_u32_to_word($v0);const $v1208=$p_u32_to_word($v1);const $v1210=$p_word_to_u32($v1206);const $v1211=$p_word_to_u32($v1208);const $v1212=$p_u32_is_lt($v1210,$v1211);const $v1213=$p_word_to_u32($v1208);const $v1214=$p_word_to_u32($v1206);return ($td<64?$b86($v1212,$v1213,$v1214,$td+1):run_named3($b86,$v1212,$v1213,$v1214,$td));}throw "bend: runtime fail-stop";}
function $b212($v0,$v1,$v2,$td=0){{const $a0=$v0,$a1=$v1;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1216,$kb);try{return $split_done($b211($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b211,2,$k1216,$sp-1);}}
function $k1216($v1216,$base,$td=0){const $v2=$stArgs[$base+0];return ($td<64?$b210($v1216,$v2,$td+1):run_named2($b210,$v1216,$v2,$td));}
function $b213($v0,$v1,$td=0){$case1218:{const $v1219=$p_is_nat_zero($v1);if($v1219){return 1;}else{break $case1218;}}$case1220:{const $v1221=$p_is_nat_successor($v1);if($v1221){const $v1222=$p_nat_predecessor($v1);{const $a0=$v0,$a1=$v1222;$stArgs[$sp++]=$v0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1224,$kb);try{return $split_done($b213($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b213,2,$k1224,$sp-1);}}else{break $case1220;}}throw "bend: runtime fail-stop";}
function $k1224($v1224,$base,$td=0){const $v0=$stArgs[$base+0];const $v1225=$p_u32_mul($v0,$v1224);return $v1225;}
function $b214($v0,$td=0){const $v1226=$p_u32_and($v0,1);const $v1227=$p_u32_is_zero($v1226);return $v1227;}
function $b252($v0,$v1,$td=0){$case1228:{const $v1229=$p_f32_to_word($v0);const $v1231=$p_f32_to_word($v1);const $v1233=$p_f32_from_word($v1229);const $v1234=$p_f32_from_word($v1231);const $v1235=$p_f32_is_lt($v1233,$v1234);const $v1236=$p_f32_from_word($v1229);const $v1237=$p_f32_from_word($v1231);return ($td<64?$b86($v1235,$v1236,$v1237,$td+1):run_named3($b86,$v1235,$v1236,$v1237,$td));}throw "bend: runtime fail-stop";}
function $b253($v0,$v1,$td=0){$case1239:{const $v1240=$p_f32_to_word($v0);const $v1242=$p_f32_to_word($v1);const $v1244=$p_f32_from_word($v1240);const $v1245=$p_f32_from_word($v1242);const $v1246=$p_f32_is_lt($v1244,$v1245);const $v1247=$p_f32_from_word($v1242);const $v1248=$p_f32_from_word($v1240);return ($td<64?$b86($v1246,$v1247,$v1248,$td+1):run_named3($b86,$v1246,$v1247,$v1248,$td));}throw "bend: runtime fail-stop";}
function $b254($v0,$v1,$v2,$td=0){{const $a0=$v0,$a1=$v1;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1250,$kb);try{return $split_done($b253($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b253,2,$k1250,$sp-1);}}
function $k1250($v1250,$base,$td=0){const $v2=$stArgs[$base+0];return ($td<64?$b252($v1250,$v2,$td+1):run_named2($b252,$v1250,$v2,$td));}
function $b255($v0,$v1,$v2,$td=0){$case1252:{const $v1253=$p_f32_to_word($v2);const $v1255=$p_f32_from_word($v1253);const $v1256=$p_f32_from_word($v1253);const $v1257=$p_f32_is_eq($v1256,f32_from_bits(0));return ($td<64?$b256($v0,$v1,$v1255,$v1257,$td+1):run_named4($b256,$v0,$v1,$v1255,$v1257,$td));}throw "bend: runtime fail-stop";}
function $b256($v0,$v1,$v2,$v3,$td=0){$case1259:{const $v1260=$p_is_true($v3);if($v1260){return $v0;}else{break $case1259;}}$case1261:{const $v1262=$p_is_false($v3);if($v1262){const $v1263=$p_f32_is_eq($v2,f32_from_bits(1065353216));return ($td<64?$b257($v0,$v1,$v2,$v1263,$td+1):run_named4($b257,$v0,$v1,$v2,$v1263,$td));}else{break $case1261;}}throw "bend: runtime fail-stop";}
function $b257($v0,$v1,$v2,$v3,$td=0){$case1265:{const $v1266=$p_is_true($v3);if($v1266){return $v1;}else{break $case1265;}}$case1267:{const $v1268=$p_is_false($v3);if($v1268){const $v1269=$p_f32_sub(f32_from_bits(1065353216),$v2);const $v1270=$p_f32_mul($v0,$v1269);const $v1271=$p_f32_mul($v1,$v2);const $v1272=$p_f32_add($v1270,$v1271);return $v1272;}else{break $case1267;}}throw "bend: runtime fail-stop";}
function $b258($v0,$td=0){$case1273:{const $v1274=$p_f32_to_word($v0);const $v1276=$p_f32_from_word($v1274);const $v1277=$p_f32_from_word($v1274);const $v1278=$p_f32_mul($v1276,$v1277);return $v1278;}throw "bend: runtime fail-stop";}
function $b259($v0,$v1,$td=0){const $v1279=$p_f32_abs($v0);const $v1281=$p_f32_abs($v1);{const $a0=$v1279,$a1=$v1281;$stArgs[$sp++]=$v1279;$stArgs[$sp++]=$v1281;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1283,$kb);try{return $split_done($b253($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b253,2,$k1283,$sp-2);}}
function $k1283($v1283,$base,$td=0){const $v1279=$stArgs[$base+0];const $v1281=$stArgs[$base+1];const $v1285=$p_f32_is_gt($v1283,f32_from_bits(1568669696));const $v1287=$p_f32_is_lt($v1283,f32_from_bits(562036736));{const $a0=$v1287,$a1=f32_from_bits(1904214016),$a2=f32_from_bits(1065353216);$stArgs[$sp++]=$v1287;$stArgs[$sp++]=$v1285;$stArgs[$sp++]=$v1279;$stArgs[$sp++]=$v1281;if($td<64){const $kb=$sp-4,$ki=$split_enter($k1289,$kb);try{return $split_done($b86($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b86,3,$k1289,$sp-4);}}
function $k1289($v1289,$base,$td=0){const $v1287=$stArgs[$base+0];const $v1285=$stArgs[$base+1];const $v1279=$stArgs[$base+2];const $v1281=$stArgs[$base+3];{const $a0=$v1285,$a1=f32_from_bits(478150656),$a2=$v1289;$stArgs[$sp++]=$v1287;$stArgs[$sp++]=$v1285;$stArgs[$sp++]=$v1279;$stArgs[$sp++]=$v1281;if($td<64){const $kb=$sp-4,$ki=$split_enter($k1290,$kb);try{return $split_done($b86($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b86,3,$k1290,$sp-4);}}
function $k1290($v1290,$base,$td=0){const $v1287=$stArgs[$base+0];const $v1285=$stArgs[$base+1];const $v1279=$stArgs[$base+2];const $v1281=$stArgs[$base+3];{const $a0=$v1287,$a1=f32_from_bits(226492416),$a2=f32_from_bits(1065353216);$stArgs[$sp++]=$v1285;$stArgs[$sp++]=$v1279;$stArgs[$sp++]=$v1281;$stArgs[$sp++]=$v1290;if($td<64){const $kb=$sp-4,$ki=$split_enter($k1292,$kb);try{return $split_done($b86($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b86,3,$k1292,$sp-4);}}
function $k1292($v1292,$base,$td=0){const $v1285=$stArgs[$base+0];const $v1279=$stArgs[$base+1];const $v1281=$stArgs[$base+2];const $v1290=$stArgs[$base+3];{const $a0=$v1285,$a1=f32_from_bits(1652555776),$a2=$v1292;$stArgs[$sp++]=$v1279;$stArgs[$sp++]=$v1281;$stArgs[$sp++]=$v1290;if($td<64){const $kb=$sp-3,$ki=$split_enter($k1293,$kb);try{return $split_done($b86($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b86,3,$k1293,$sp-3);}}
function $k1293($v1293,$base,$td=0){const $v1279=$stArgs[$base+0];const $v1281=$stArgs[$base+1];const $v1290=$stArgs[$base+2];const $v1295=$p_f32_mul($v1279,$v1290);const $v1297=$p_f32_mul($v1281,$v1290);const $v1299=$p_f32_mul($v1295,$v1295);const $v1300=$p_f32_mul($v1297,$v1297);const $v1301=$p_f32_add($v1299,$v1300);const $v1302=$p_f32_sqrt($v1301);const $v1303=$p_f32_mul($v1302,$v1293);return $v1303;}
function $b260($v0,$v1,$v2,$td=0){$case1304:{const $v1305=$p_is_true($v2);if($v1305){const $v1306=$p_f32_mul($v0,f32_from_bits(0));return $v1306;}else{break $case1304;}}$case1307:{const $v1308=$p_is_false($v2);if($v1308){return $v1;}else{break $case1307;}}throw "bend: runtime fail-stop";}
function $b261($v0,$td=0){$case1309:{const $v1310=$p_f32_to_word($v0);const $v1312=$p_f32_from_word($v1310);const $v1313=$p_f32_floor($v1312);const $v1315=$p_f32_from_word($v1310);const $v1316=$p_f32_sub($v1315,$v1313);const $v1317=$p_f32_is_ge($v1316,f32_from_bits(1056964608));{const $a0=$v1317,$a1=f32_from_bits(1065353216),$a2=f32_from_bits(0);$stArgs[$sp++]=$v1313;$stArgs[$sp++]=$v1310;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1318,$kb);try{return $split_done($b86($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b86,3,$k1318,$sp-2);}}throw "bend: runtime fail-stop";}
function $k1318($v1318,$base,$td=0){const $v1313=$stArgs[$base+0];const $v1310=$stArgs[$base+1];const $v1319=$p_f32_add($v1313,$v1318);const $v1321=$p_f32_from_word($v1310);const $v1322=$p_f32_is_eq($v1319,f32_from_bits(0));return ($td<64?$b260($v1321,$v1319,$v1322,$td+1):run_named3($b260,$v1321,$v1319,$v1322,$td));}
function $b263($v0,$td=0){const $v1324=$p_u32_from_nat($v0);const $v1325=$p_u32_to_f32($v1324);return $v1325;}
function $b264($v0,$v1,$td=0){$case1326:{const $v1327=$p_is_false($v1);if($v1327){const $v1328=$p_f32_to_u32($v0);const $v1329=$p_u32_to_nat($v1328);return $v1329;}else{break $case1326;}}$case1330:{const $v1331=$p_is_true($v1);if($v1331){const $v1332=$p_f32_div($v0,f32_from_bits(1333788672));const $v1333=$p_f32_to_u32($v1332);const $v1334=$p_u32_to_nat($v1333);const $v1336=$p_f32_mod($v0,f32_from_bits(1333788672));const $v1337=$p_f32_to_u32($v1336);const $v1338=$p_u32_to_nat($v1337);const $v1340=$p_u32_to_nat(65536);const $v1341=$p_u32_to_nat(65536);const $v1342=$p_nat_mul($v1340,$v1341);const $v1343=$p_nat_mul($v1334,$v1342);const $v1344=$p_nat_add($v1343,$v1338);return $v1344;}else{break $case1330;}}throw "bend: runtime fail-stop";}
function $b265($v0,$td=0){$case1345:{const $v1346=$p_f32_to_word($v0);const $v1348=$p_f32_from_word($v1346);const $v1349=$p_f32_is_ge($v1348,f32_from_bits(1333788672));const $v1350=$p_f32_from_word($v1346);const $v1351=$p_f32_is_lt($v1350,f32_from_bits(1468006400));{const $a0=$v1349,$a1=$v1351;$stArgs[$sp++]=$v1346;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1352,$kb);try{return $split_done($b81($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b81,2,$k1352,$sp-1);}}throw "bend: runtime fail-stop";}
function $k1352($v1352,$base,$td=0){const $v1346=$stArgs[$base+0];const $v1354=$p_f32_from_word($v1346);return ($td<64?$b264($v1354,$v1352,$td+1):run_named2($b264,$v1354,$v1352,$td));}
function $b266($v0,$v1,$td=0){$case1356:{const $v1357=$p_char_code($v0);const $v1359=$p_char_code($v1);const $v1361=$p_char_new($v1357);const $v1362=$p_char_new($v1359);const $v1363=({$:"Tuple","fst":$v1361,"snd":$v1362});const $v1364=$p_u32_cmp($v1357,$v1359);const $v1365=({$:"Tuple","fst":$v1363,"snd":$v1364});return $v1365;}throw "bend: runtime fail-stop";}
function $b267($v0,$td=0){$case1366:{const $v1367=$p_char_code($v0);return $v1367;}throw "bend: runtime fail-stop";}
function $b268($v0,$td=0){const $v1369=$p_char_new($v0);return $v1369;}
function $b269($v0,$v1,$td=0){$case1370:{const $v1371=$p_char_code($v0);const $v1373=$p_char_code($v1);const $v1375=$p_u32_is_eq($v1371,$v1373);return $v1375;}throw "bend: runtime fail-stop";}
function $b270($v0,$td=0){$case1376:{const $v1377=$p_char_code($v0);const $v1379=$p_u32_is_ge($v1377,48);const $v1380=$p_u32_is_le($v1377,57);return ($td<64?$b81($v1379,$v1380,$td+1):run_named2($b81,$v1379,$v1380,$td));}throw "bend: runtime fail-stop";}
function $b271($v0,$td=0){$case1382:{const $v1383=$p_char_code($v0);const $v1385=$p_u32_is_ge($v1383,65);const $v1386=$p_u32_is_le($v1383,90);return ($td<64?$b81($v1385,$v1386,$td+1):run_named2($b81,$v1385,$v1386,$td));}throw "bend: runtime fail-stop";}
function $b272($v0,$td=0){$case1388:{const $v1389=$p_char_code($v0);const $v1391=$p_u32_is_ge($v1389,97);const $v1392=$p_u32_is_le($v1389,122);return ($td<64?$b81($v1391,$v1392,$td+1):run_named2($b81,$v1391,$v1392,$td));}throw "bend: runtime fail-stop";}
function $b273($v0,$td=0){{const $a0=$v0;$stArgs[$sp++]=$v0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1394,$kb);try{return $split_done($b271($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b271,1,$k1394,$sp-1);}}
function $k1394($v1394,$base,$td=0){const $v0=$stArgs[$base+0];{const $a0=$v0;$stArgs[$sp++]=$v1394;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1395,$kb);try{return $split_done($b272($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b272,1,$k1395,$sp-1);}}
function $k1395($v1395,$base,$td=0){const $v1394=$stArgs[$base+0];const $v1396=$p_bool_or($v1394,$v1395);return $v1396;}
function $b274($v0,$td=0){$case1397:{const $v1398=$p_char_code($v0);const $v1400=$p_u32_is_eq($v1398,32);const $v1401=$p_u32_is_ge($v1398,9);const $v1402=$p_u32_is_le($v1398,13);{const $a0=$v1401,$a1=$v1402;$stArgs[$sp++]=$v1400;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1403,$kb);try{return $split_done($b81($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b81,2,$k1403,$sp-1);}}throw "bend: runtime fail-stop";}
function $k1403($v1403,$base,$td=0){const $v1400=$stArgs[$base+0];const $v1404=$p_bool_or($v1400,$v1403);return $v1404;}
function $b275($v0,$td=0){$case1405:{const $v1406=$p_char_code($v0);const $v1408=$p_char_new($v1406);{const $a0=$v1408;$stArgs[$sp++]=$v1406;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1409,$kb);try{return $split_done($b272($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b272,1,$k1409,$sp-1);}}throw "bend: runtime fail-stop";}
function $k1409($v1409,$base,$td=0){const $v1406=$stArgs[$base+0];{const $a0=$v1409;$stArgs[$sp++]=$v1406;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1410,$kb);try{return $split_done($b87($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b87,1,$k1410,$sp-1);}}
function $k1410($v1410,$base,$td=0){const $v1406=$stArgs[$base+0];const $v1411=$p_u32_mul($v1410,32);const $v1412=$p_u32_sub($v1406,$v1411);const $v1413=$p_char_new($v1412);return $v1413;}
function $b276($v0,$td=0){$case1414:{const $v1415=$p_char_code($v0);const $v1417=$p_char_new($v1415);{const $a0=$v1417;$stArgs[$sp++]=$v1415;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1418,$kb);try{return $split_done($b271($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b271,1,$k1418,$sp-1);}}throw "bend: runtime fail-stop";}
function $k1418($v1418,$base,$td=0){const $v1415=$stArgs[$base+0];{const $a0=$v1418;$stArgs[$sp++]=$v1415;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1419,$kb);try{return $split_done($b87($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b87,1,$k1419,$sp-1);}}
function $k1419($v1419,$base,$td=0){const $v1415=$stArgs[$base+0];const $v1420=$p_u32_mul($v1419,32);const $v1421=$p_u32_add($v1415,$v1420);const $v1422=$p_char_new($v1421);return $v1422;}
function $b278($v0,$v1,$v2,$td=0){$case1423:{const $v1424=($v2&&$v2.$==="Tuple");if($v1424){const $v1425=$v2.fst;const $v1426=($v1425&&$v1425.$==="Tuple");if($v1426){const $v1427=$v1425.fst;const $v1429=$v1425.snd;const $v1431=$v2.snd;const $v1433=$p_string_append($v0,$v1427);const $v1434=$p_string_append($v1,$v1429);const $v1435=({$:"Tuple","fst":$v1433,"snd":$v1434});const $v1436=({$:"Tuple","fst":$v1435,"snd":$v1431});return $v1436;}else{break $case1423;}}else{break $case1423;}}throw "bend: runtime fail-stop";}
function $b471($c0,$c1,$c2,$c3,$v1447,$td=0){switch($v1447?.$){case "LT":{$case1448:{const $v1449=true;const $v1450=$p_string_append($c0,$c1);const $v1451=$p_string_append($c2,$c3);const $v1452=({$:"Tuple","fst":$v1450,"snd":$v1451});const $v1453=({$:"LT"});const $v1454=({$:"Tuple","fst":$v1452,"snd":$v1453});return $v1454;}break;}case "EQ":{$case1455:{const $v1456=true;const $v1457=$p_string_cmp($c1,$c3);return ($td<64?$b278($c0,$c2,$v1457,$td+1):run_named3($b278,$c0,$c2,$v1457,$td));}break;}case "GT":{$case1459:{const $v1460=true;const $v1461=$p_string_append($c0,$c1);const $v1462=$p_string_append($c2,$c3);const $v1463=({$:"Tuple","fst":$v1461,"snd":$v1462});const $v1464=({$:"GT"});const $v1465=({$:"Tuple","fst":$v1463,"snd":$v1464});return $v1465;}break;}}throw "bend: runtime fail-stop";}
function $b280($v0,$v1,$v2,$td=0){$case1437:{const $v1438=($v2&&$v2.$==="Tuple");if($v1438){const $v1439=$v2.fst;const $v1440=($v1439&&$v1439.$==="Tuple");if($v1440){const $v1441=$v1439.fst;const $v1443=$v1439.snd;const $v1445=$v2.snd;return ($td<64?$b471($v1441,$v0,$v1443,$v1,$v1445,$td+1):run_named5($b471,$v1441,$v0,$v1443,$v1,$v1445,$td));}else{break $case1437;}}else{break $case1437;}}throw "bend: runtime fail-stop";}
function $b284($v0,$td=0){$case1467:{const $v1468=$p_is_string_empty($v0);if($v1468){return true;}else{break $case1467;}}$case1469:{const $v1470=$p_is_string_nonempty($v0);if($v1470){const $v1471=$p_string_head($v0);const $v1473=$p_string_tail($v0);return false;}else{break $case1469;}}throw "bend: runtime fail-stop";}
function $b285($v0,$v1,$td=0){$case1475:{const $v1476=$p_is_string_empty($v0);if($v1476){return $v1;}else{break $case1475;}}$case1477:{const $v1478=$p_is_string_nonempty($v0);if($v1478){const $v1479=$p_string_head($v0);const $v1481=$p_string_tail($v0);const $v1483=$p_string_append($v1479,$v1);return ($td<64?$b285($v1481,$v1483,$td+1):run_named2($b285,$v1481,$v1483,$td));}else{break $case1477;}}throw "bend: runtime fail-stop";}
function $b286($v0,$td=0){return ($td<64?$b285($v0,"",$td+1):run_named2($b285,$v0,"",$td));}
function $b287($v0,$v1,$v2,$td=0){$case1486:{const $v1487=$p_is_string_empty($v0);if($v1487){const $v1488=$p_is_string_nonempty($v1);if($v1488){const $v1489=$p_string_head($v1);const $v1491=$p_string_tail($v1);const $v1493=($v2&&$v2.$==="EQ");if($v1493){const $v1494=({$:"LT"});return $v1494;}else{break $case1486;}}else{break $case1486;}}else{break $case1486;}}$case1495:{const $v1496=$p_is_string_nonempty($v0);if($v1496){const $v1497=$p_string_head($v0);const $v1499=$p_string_tail($v0);const $v1501=$p_is_string_empty($v1);if($v1501){const $v1502=($v2&&$v2.$==="EQ");if($v1502){const $v1503=({$:"GT"});return $v1503;}else{break $case1495;}}else{break $case1495;}}else{break $case1495;}}$case1504:{const $v1505=$p_is_string_nonempty($v0);if($v1505){const $v1506=$p_string_head($v0);const $v1507=$p_char_code($v1506);const $v1509=$p_string_tail($v0);const $v1511=$p_is_string_nonempty($v1);if($v1511){const $v1512=$p_string_head($v1);const $v1513=$p_char_code($v1512);const $v1515=$p_string_tail($v1);const $v1517=($v2&&$v2.$==="EQ");if($v1517){const $v1518=$p_u32_cmp($v1507,$v1513);return ($td<64?$b287($v1509,$v1515,$v1518,$td+1):run_named3($b287,$v1509,$v1515,$v1518,$td));}else{break $case1504;}}else{break $case1504;}}else{break $case1504;}}$case1520:{return $v2;}throw "bend: runtime fail-stop";}
function $b288($v0,$v1,$td=0){const $v1524=({$:"EQ"});return ($td<64?$b287($v0,$v1,$v1524,$td+1):run_named3($b287,$v0,$v1,$v1524,$td));}
function $b289($v0,$v1,$td=0){const $v1526=$p_string_cmp($v0,$v1);{const $a0=$v1526;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1527,$kb);try{return $split_done($b5($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b5,1,$k1527,$sp-0);}}
function $k1527($v1527,$base,$td=0){return ($td<64?$b88($v1527,$td+1):run_named1($b88,$v1527,$td));}
function $b290($v0,$v1,$td=0){const $v1529=$p_string_cmp($v0,$v1);{const $a0=$v1529;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1530,$kb);try{return $split_done($b5($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b5,1,$k1530,$sp-0);}}
function $k1530($v1530,$base,$td=0){return ($td<64?$b91($v1530,$td+1):run_named1($b91,$v1530,$td));}
function $b291($v0,$v1,$td=0){const $v1532=$p_string_cmp($v0,$v1);{const $a0=$v1532;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1533,$kb);try{return $split_done($b5($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b5,1,$k1533,$sp-0);}}
function $k1533($v1533,$base,$td=0){return ($td<64?$b90($v1533,$td+1):run_named1($b90,$v1533,$td));}
function $b292($v0,$v1,$td=0){const $v1535=$p_string_cmp($v0,$v1);{const $a0=$v1535;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1536,$kb);try{return $split_done($b5($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b5,1,$k1536,$sp-0);}}
function $k1536($v1536,$base,$td=0){return ($td<64?$b92($v1536,$td+1):run_named1($b92,$v1536,$td));}
function $b293($v0,$v1,$v2,$td=0){$case1538:{const $v1539=$p_is_false($v2);if($v1539){return false;}else{break $case1538;}}$case1540:{const $v1541=$p_is_true($v2);if($v1541){return ($td<64?$b294($v0,$v1,$td+1):run_named2($b294,$v0,$v1,$td));}else{break $case1540;}}throw "bend: runtime fail-stop";}
function $b294($v0,$v1,$td=0){$case1543:{const $v1544=$p_is_string_empty($v0);if($v1544){return true;}else{break $case1543;}}$case1546:{const $v1547=$p_is_string_nonempty($v0);if($v1547){const $v1548=$p_string_head($v0);const $v1550=$p_string_tail($v0);const $v1552=$p_is_string_empty($v1);if($v1552){return false;}else{break $case1546;}}else{break $case1546;}}$case1553:{const $v1554=$p_is_string_nonempty($v0);if($v1554){const $v1555=$p_string_head($v0);const $v1557=$p_string_tail($v0);const $v1559=$p_is_string_nonempty($v1);if($v1559){const $v1560=$p_string_head($v1);const $v1562=$p_string_tail($v1);{const $a0=$v1560,$a1=$v1555;$stArgs[$sp++]=$v1557;$stArgs[$sp++]=$v1562;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1564,$kb);try{return $split_done($b269($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b269,2,$k1564,$sp-2);}}else{break $case1553;}}else{break $case1553;}}throw "bend: runtime fail-stop";}
function $k1564($v1564,$base,$td=0){const $v1557=$stArgs[$base+0];const $v1562=$stArgs[$base+1];return ($td<64?$b293($v1557,$v1562,$v1564,$td+1):run_named3($b293,$v1557,$v1562,$v1564,$td));}
function $b295($v0,$v1,$td=0){return ($td<64?$b294($v1,$v0,$td+1):run_named2($b294,$v1,$v0,$td));}
function $b296($v0,$v1,$td=0){{const $a0=$v0;$stArgs[$sp++]=$v1;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1567,$kb);try{return $split_done($b286($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b286,1,$k1567,$sp-1);}}
function $k1567($v1567,$base,$td=0){const $v1=$stArgs[$base+0];{const $a0=$v1;$stArgs[$sp++]=$v1567;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1568,$kb);try{return $split_done($b286($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b286,1,$k1568,$sp-1);}}
function $k1568($v1568,$base,$td=0){const $v1567=$stArgs[$base+0];return ($td<64?$b295($v1567,$v1568,$td+1):run_named2($b295,$v1567,$v1568,$td));}
function $b297($v0,$v1,$v2,$td=0){$case1570:{const $v1571=$p_is_false($v2);if($v1571){return ($td<64?$b298($v0,$v1,$td+1):run_named2($b298,$v0,$v1,$td));}else{break $case1570;}}$case1573:{const $v1574=$p_is_true($v2);if($v1574){return true;}else{break $case1573;}}throw "bend: runtime fail-stop";}
function $b298($v0,$v1,$td=0){$case1575:{const $v1576=$p_is_string_empty($v0);if($v1576){return ($td<64?$b284($v1,$td+1):run_named1($b284,$v1,$td));}else{break $case1575;}}$case1578:{const $v1579=$p_is_string_nonempty($v0);if($v1579){const $v1580=$p_string_head($v0);const $v1582=$p_string_tail($v0);const $v1584=$p_string_append($v1580,$v1582);{const $a0=$v1584,$a1=$v1;$stArgs[$sp++]=$v1582;$stArgs[$sp++]=$v1;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1585,$kb);try{return $split_done($b295($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b295,2,$k1585,$sp-2);}}else{break $case1578;}}throw "bend: runtime fail-stop";}
function $k1585($v1585,$base,$td=0){const $v1582=$stArgs[$base+0];const $v1=$stArgs[$base+1];return ($td<64?$b297($v1582,$v1,$v1585,$td+1):run_named3($b297,$v1582,$v1,$v1585,$td));}
function $b299($v0,$v1,$td=0){$case1587:{const $v1588=$p_is_string_empty($v0);if($v1588){return "";}else{break $case1587;}}$case1590:{const $v1591=$p_is_string_nonempty($v0);if($v1591){const $v1592=$p_string_head($v0);const $v1594=$p_string_tail($v0);const $v1596=$p_is_nat_zero($v1);if($v1596){return "";}else{break $case1590;}}else{break $case1590;}}$case1597:{const $v1598=$p_is_string_nonempty($v0);if($v1598){const $v1599=$p_string_head($v0);const $v1601=$p_string_tail($v0);const $v1603=$p_is_nat_successor($v1);if($v1603){const $v1604=$p_nat_predecessor($v1);{const $a0=$v1601,$a1=$v1604;$stArgs[$sp++]=$v1599;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1606,$kb);try{return $split_done($b299($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b299,2,$k1606,$sp-1);}}else{break $case1597;}}else{break $case1597;}}throw "bend: runtime fail-stop";}
function $k1606($v1606,$base,$td=0){const $v1599=$stArgs[$base+0];const $v1607=$p_string_append($v1599,$v1606);return $v1607;}
function $b300($v0,$v1,$td=0){$case1608:{const $v1609=$p_is_string_empty($v0);if($v1609){return "";}else{break $case1608;}}$case1611:{const $v1612=$p_is_string_nonempty($v0);if($v1612){const $v1613=$p_string_head($v0);const $v1615=$p_string_tail($v0);const $v1617=$p_is_nat_zero($v1);if($v1617){const $v1618=$p_string_append($v1613,$v1615);return $v1618;}else{break $case1611;}}else{break $case1611;}}$case1619:{const $v1620=$p_is_string_nonempty($v0);if($v1620){const $v1621=$p_string_head($v0);const $v1623=$p_string_tail($v0);const $v1625=$p_is_nat_successor($v1);if($v1625){const $v1626=$p_nat_predecessor($v1);return ($td<64?$b300($v1623,$v1626,$td+1):run_named2($b300,$v1623,$v1626,$td));}else{break $case1619;}}else{break $case1619;}}throw "bend: runtime fail-stop";}
function $b301($v0,$v1,$td=0){$case1629:{const $v1630=$p_is_string_empty($v0);if($v1630){const $v1632=({$:"None"});return $v1632;}else{break $case1629;}}$case1633:{const $v1634=$p_is_string_nonempty($v0);if($v1634){const $v1635=$p_string_head($v0);const $v1637=$p_string_tail($v0);const $v1639=$p_is_nat_zero($v1);if($v1639){const $v1640=({$:"Some","value":$v1635});return $v1640;}else{break $case1633;}}else{break $case1633;}}$case1641:{const $v1642=$p_is_string_nonempty($v0);if($v1642){const $v1643=$p_string_head($v0);const $v1645=$p_string_tail($v0);const $v1647=$p_is_nat_successor($v1);if($v1647){const $v1648=$p_nat_predecessor($v1);return ($td<64?$b301($v1645,$v1648,$td+1):run_named2($b301,$v1645,$v1648,$td));}else{break $case1641;}}else{break $case1641;}}throw "bend: runtime fail-stop";}
function $b303($v0,$td=0){$case1651:{const $v1652=($v0&&$v0.$==="Nil");if($v1652){return "";}else{break $case1651;}}$case1653:{const $v1654=($v0&&$v0.$==="Con");if($v1654){const $v1655=$v0.head;const $v1657=$v0.tail;{const $a0=$v1657;$stArgs[$sp++]=$v1655;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1659,$kb);try{return $split_done($b303($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b303,1,$k1659,$sp-1);}}else{break $case1653;}}throw "bend: runtime fail-stop";}
function $k1659($v1659,$base,$td=0){const $v1655=$stArgs[$base+0];const $v1660=$p_string_append($v1655,$v1659);return $v1660;}
function $b304($v0,$td=0){$case1661:{const $v1662=($v0&&$v0.$==="Nil");if($v1662){return "";}else{break $case1661;}}$case1663:{const $v1664=($v0&&$v0.$==="Con");if($v1664){const $v1665=$v0.head;const $v1667=$v0.tail;{const $a0=$v1667;$stArgs[$sp++]=$v1665;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1669,$kb);try{return $split_done($b304($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b304,1,$k1669,$sp-1);}}else{break $case1663;}}throw "bend: runtime fail-stop";}
function $k1669($v1669,$base,$td=0){const $v1665=$stArgs[$base+0];const $v1670=$p_string_append($v1665,$v1669);return $v1670;}
function $b305($v0,$v1,$v2,$td=0){$case1671:{const $v1672=($v0&&$v0.$==="Nil");if($v1672){return $v1;}else{break $case1671;}}$case1673:{const $v1674=($v0&&$v0.$==="Con");if($v1674){const $v1675=$v0.head;const $v1677=$v0.tail;{const $a0=$v1677,$a1=$v1675,$a2=$v2;$stArgs[$sp++]=$v2;$stArgs[$sp++]=$v1;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1679,$kb);try{return $split_done($b305($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b305,3,$k1679,$sp-2);}}else{break $case1673;}}throw "bend: runtime fail-stop";}
function $k1679($v1679,$base,$td=0){const $v2=$stArgs[$base+0];const $v1=$stArgs[$base+1];const $v1680=$p_string_append($v2,$v1679);const $v1681=$p_string_append($v1,$v1680);return $v1681;}
function $b306($v0,$v1,$td=0){$case1682:{const $v1683=($v0&&$v0.$==="Nil");if($v1683){return "";}else{break $case1682;}}$case1684:{const $v1685=($v0&&$v0.$==="Con");if($v1685){const $v1686=$v0.head;const $v1688=$v0.tail;return ($td<64?$b305($v1688,$v1686,$v1,$td+1):run_named3($b305,$v1688,$v1686,$v1,$td));}else{break $case1684;}}throw "bend: runtime fail-stop";}
function $b307($v0,$v1,$td=0){$case1691:{const $v1692=($v1&&$v1.$==="Nil");if($v1692){const $v1693=$p_string_append($v0,"");const $v1694=({$:"Nil"});const $v1695=({$:"Con","head":$v1693,"tail":$v1694});return $v1695;}else{break $case1691;}}$case1696:{const $v1697=($v1&&$v1.$==="Con");if($v1697){const $v1698=$v1.head;const $v1700=$v1.tail;const $v1702=$p_string_append($v0,$v1698);const $v1703=({$:"Con","head":$v1702,"tail":$v1700});return $v1703;}else{break $case1696;}}throw "bend: runtime fail-stop";}
function $b308($v0,$v1,$v2,$td=0){$case1704:{const $v1705=$p_is_false($v2);if($v1705){return ($td<64?$b307($v0,$v1,$td+1):run_named2($b307,$v0,$v1,$td));}else{break $case1704;}}$case1707:{const $v1708=$p_is_true($v2);if($v1708){const $v1709=({$:"Con","head":"","tail":$v1});return $v1709;}else{break $case1707;}}throw "bend: runtime fail-stop";}
function $b309($v0,$v1,$td=0){$case1710:{const $v1711=$p_is_string_empty($v0);if($v1711){const $v1712=({$:"Nil"});const $v1713=({$:"Con","head":"","tail":$v1712});return $v1713;}else{break $case1710;}}$case1714:{const $v1715=$p_is_string_nonempty($v0);if($v1715){const $v1716=$p_string_head($v0);const $v1718=$p_string_tail($v0);{const $a0=$v1718,$a1=$v1;$stArgs[$sp++]=$v1;$stArgs[$sp++]=$v1716;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1720,$kb);try{return $split_done($b309($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b309,2,$k1720,$sp-2);}}else{break $case1714;}}throw "bend: runtime fail-stop";}
function $k1720($v1720,$base,$td=0){const $v1=$stArgs[$base+0];const $v1716=$stArgs[$base+1];{const $a0=$v1716,$a1=$v1;$stArgs[$sp++]=$v1716;$stArgs[$sp++]=$v1720;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1721,$kb);try{return $split_done($b269($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b269,2,$k1721,$sp-2);}}
function $k1721($v1721,$base,$td=0){const $v1716=$stArgs[$base+0];const $v1720=$stArgs[$base+1];return ($td<64?$b308($v1716,$v1720,$v1721,$td+1):run_named3($b308,$v1716,$v1720,$v1721,$td));}
function $b310($v0,$td=0){const $v1723=$p_char_new(10);return ($td<64?$b309($v0,$v1723,$td+1):run_named2($b309,$v0,$v1723,$td));}
function $b311($v0,$v1,$td=0){$case1725:{const $v1726=$p_is_nat_zero($v1);if($v1726){return "";}else{break $case1725;}}$case1727:{const $v1728=$p_is_nat_successor($v1);if($v1728){const $v1729=$p_nat_predecessor($v1);{const $a0=$v0,$a1=$v1729;$stArgs[$sp++]=$v0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1731,$kb);try{return $split_done($b311($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b311,2,$k1731,$sp-1);}}else{break $case1727;}}throw "bend: runtime fail-stop";}
function $k1731($v1731,$base,$td=0){const $v0=$stArgs[$base+0];const $v1732=$p_string_append($v0,$v1731);return $v1732;}
function $b312($v0,$td=0){$case1733:{const $v1734=$p_is_string_empty($v0);if($v1734){return "";}else{break $case1733;}}$case1735:{const $v1736=$p_is_string_nonempty($v0);if($v1736){const $v1737=$p_string_head($v0);const $v1739=$p_string_tail($v0);{const $a0=$v1737;$stArgs[$sp++]=$v1739;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1741,$kb);try{return $split_done($b275($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b275,1,$k1741,$sp-1);}}else{break $case1735;}}throw "bend: runtime fail-stop";}
function $k1741($v1741,$base,$td=0){const $v1739=$stArgs[$base+0];{const $a0=$v1739;$stArgs[$sp++]=$v1741;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1742,$kb);try{return $split_done($b312($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b312,1,$k1742,$sp-1);}}
function $k1742($v1742,$base,$td=0){const $v1741=$stArgs[$base+0];const $v1743=$p_string_append($v1741,$v1742);return $v1743;}
function $b313($v0,$td=0){$case1744:{const $v1745=$p_is_string_empty($v0);if($v1745){return "";}else{break $case1744;}}$case1746:{const $v1747=$p_is_string_nonempty($v0);if($v1747){const $v1748=$p_string_head($v0);const $v1750=$p_string_tail($v0);{const $a0=$v1748;$stArgs[$sp++]=$v1750;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1752,$kb);try{return $split_done($b276($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b276,1,$k1752,$sp-1);}}else{break $case1746;}}throw "bend: runtime fail-stop";}
function $k1752($v1752,$base,$td=0){const $v1750=$stArgs[$base+0];{const $a0=$v1750;$stArgs[$sp++]=$v1752;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1753,$kb);try{return $split_done($b313($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b313,1,$k1753,$sp-1);}}
function $k1753($v1753,$base,$td=0){const $v1752=$stArgs[$base+0];const $v1754=$p_string_append($v1752,$v1753);return $v1754;}
function $b314($v0,$v1,$v2,$td=0){$case1755:{const $v1756=$p_is_false($v2);if($v1756){const $v1757=$p_string_append($v1,$v0);return $v1757;}else{break $case1755;}}$case1758:{const $v1759=$p_is_true($v2);if($v1759){return ($td<64?$b315($v0,$td+1):run_named1($b315,$v0,$td));}else{break $case1758;}}throw "bend: runtime fail-stop";}
function $b315($v0,$td=0){$case1761:{const $v1762=$p_is_string_empty($v0);if($v1762){return "";}else{break $case1761;}}$case1763:{const $v1764=$p_is_string_nonempty($v0);if($v1764){const $v1765=$p_string_head($v0);const $v1767=$p_string_tail($v0);{const $a0=$v1765;$stArgs[$sp++]=$v1767;$stArgs[$sp++]=$v1765;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1769,$kb);try{return $split_done($b274($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b274,1,$k1769,$sp-2);}}else{break $case1763;}}throw "bend: runtime fail-stop";}
function $k1769($v1769,$base,$td=0){const $v1767=$stArgs[$base+0];const $v1765=$stArgs[$base+1];return ($td<64?$b314($v1767,$v1765,$v1769,$td+1):run_named3($b314,$v1767,$v1765,$v1769,$td));}
function $b316($v0,$td=0){{const $a0=$v0;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1771,$kb);try{return $split_done($b286($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b286,1,$k1771,$sp-0);}}
function $k1771($v1771,$base,$td=0){{const $a0=$v1771;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1772,$kb);try{return $split_done($b315($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b315,1,$k1772,$sp-0);}}
function $k1772($v1772,$base,$td=0){return ($td<64?$b286($v1772,$td+1):run_named1($b286,$v1772,$td));}
function $b317($v0,$td=0){{const $a0=$v0;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1774,$kb);try{return $split_done($b315($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b315,1,$k1774,$sp-0);}}
function $k1774($v1774,$base,$td=0){return ($td<64?$b316($v1774,$td+1):run_named1($b316,$v1774,$td));}
function $b318($v0,$td=0){$case1776:{const $v1777=($v0&&$v0.$==="Tuple");if($v1777){const $v1778=$v0.fst;const $v1780=$v0.snd;const $v1782=$p_nat_add(48,$v1780);const $v1783=$p_u32_from_nat($v1782);const $v1784=$p_char_new($v1783);const $v1785=({$:"Tuple","fst":$v1784,"snd":$v1778});return $v1785;}else{break $case1776;}}throw "bend: runtime fail-stop";}
function $b472($c0,$c1,$c2,$v1792,$td=0){$case1793:{const $v1794=$p_is_nat_zero($v1792);if($v1794){const $v1795=$p_string_append($c0,$c1);return $v1795;}else{break $case1793;}}$case1796:{const $v1797=$p_is_nat_successor($v1792);if($v1797){const $v1798=$p_nat_predecessor($v1792);const $v1800=$p_nat_successor($v1798);const $v1801=$p_string_append($c0,$c1);return ($td<64?$b320($c2,$v1800,$v1801,$td+1):run_named3($b320,$c2,$v1800,$v1801,$td));}else{break $case1796;}}throw "bend: runtime fail-stop";}
function $b319($v0,$v1,$v2,$td=0){$case1786:{const $v1787=($v2&&$v2.$==="Tuple");if($v1787){const $v1788=$v2.fst;const $v1790=$v2.snd;return ($td<64?$b472($v1788,$v1,$v0,$v1790,$td+1):run_named4($b472,$v1788,$v1,$v0,$v1790,$td));}else{break $case1786;}}throw "bend: runtime fail-stop";}
function $b320($v0,$v1,$v2,$td=0){$case1804:{const $v1805=$p_is_nat_zero($v0);if($v1805){return $v2;}else{break $case1804;}}$case1806:{const $v1807=$p_is_nat_successor($v0);if($v1807){const $v1808=$p_nat_predecessor($v0);const $v1810=$p_nat_divmod($v1,10);{const $a0=$v1810;$stArgs[$sp++]=$v1808;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1811,$kb);try{return $split_done($b318($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b318,1,$k1811,$sp-2);}}else{break $case1806;}}throw "bend: runtime fail-stop";}
function $k1811($v1811,$base,$td=0){const $v1808=$stArgs[$base+0];const $v2=$stArgs[$base+1];return ($td<64?$b319($v1808,$v2,$v1811,$td+1):run_named3($b319,$v1808,$v2,$v1811,$td));}
function $b321($v0,$td=0){const $v1814=$p_nat_divmod($v0,10);{const $a0=$v1814;$stArgs[$sp++]=$v0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1815,$kb);try{return $split_done($b318($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b318,1,$k1815,$sp-1);}}
function $k1815($v1815,$base,$td=0){const $v0=$stArgs[$base+0];return ($td<64?$b319($v0,"",$v1815,$td+1):run_named3($b319,$v0,"",$v1815,$td));}
function $b322($v0,$v1,$v2,$v3,$td=0){$case1817:{const $v1818=$p_is_true($v3);if($v1818){const $v1819=$p_nat_mul($v1,10);const $v1820=$p_u32_to_nat($v2);const $v1821=$p_nat_add($v1819,$v1820);return ($td<64?$b323($v0,$v1821,$td+1):run_named2($b323,$v0,$v1821,$td));}else{break $case1817;}}$case1823:{const $v1824=$p_is_false($v3);if($v1824){const $v1825=({$:"None"});return $v1825;}else{break $case1823;}}throw "bend: runtime fail-stop";}
function $b323($v0,$v1,$td=0){$case1826:{const $v1827=$p_is_string_empty($v0);if($v1827){const $v1828=({$:"Some","value":$v1});return $v1828;}else{break $case1826;}}$case1829:{const $v1830=$p_is_string_nonempty($v0);if($v1830){const $v1831=$p_string_head($v0);const $v1832=$p_char_code($v1831);const $v1834=$p_string_tail($v0);const $v1836=$p_u32_sub($v1832,48);const $v1838=$p_u32_is_lt($v1836,10);return ($td<64?$b322($v1834,$v1,$v1836,$v1838,$td+1):run_named4($b322,$v1834,$v1,$v1836,$v1838,$td));}else{break $case1829;}}throw "bend: runtime fail-stop";}
function $b324($v0,$td=0){$case1840:{const $v1841=$p_is_string_nonempty($v0);if($v1841){const $v1842=$p_string_head($v0);const $v1843=$p_char_code($v1842);const $v1844=$p_same_value($v1843,48);if($v1844){const $v1845=$p_string_tail($v0);return ($td<64?$b324($v1845,$td+1):run_named1($b324,$v1845,$td));}else{break $case1840;}}else{break $case1840;}}$case1848:{return $v0;}throw "bend: runtime fail-stop";}
function $b325($v0,$td=0){const $v1850=$p_string_length($v0);const $v1852=$p_nat_is_lt($v1850,15);{const $a0=$v1850,$a1=15;$stArgs[$sp++]=$v0;$stArgs[$sp++]=$v1852;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1853,$kb);try{return $split_done($b101($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b101,2,$k1853,$sp-2);}}
function $k1853($v1853,$base,$td=0){const $v0=$stArgs[$base+0];const $v1852=$stArgs[$base+1];{const $a0=$v0,$a1="281474976710655";$stArgs[$sp++]=$v1853;$stArgs[$sp++]=$v1852;if($td<64){const $kb=$sp-2,$ki=$split_enter($k1854,$kb);try{return $split_done($b290($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b290,2,$k1854,$sp-2);}}
function $k1854($v1854,$base,$td=0){const $v1853=$stArgs[$base+0];const $v1852=$stArgs[$base+1];{const $a0=$v1853,$a1=$v1854;$stArgs[$sp++]=$v1852;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1855,$kb);try{return $split_done($b81($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b81,2,$k1855,$sp-1);}}
function $k1855($v1855,$base,$td=0){const $v1852=$stArgs[$base+0];const $v1856=$p_bool_or($v1852,$v1855);return $v1856;}
function $b326($v0,$v1,$td=0){$case1857:{const $v1858=$p_is_true($v1);if($v1858){return ($td<64?$b323($v0,0,$td+1):run_named2($b323,$v0,0,$td));}else{break $case1857;}}$case1860:{const $v1861=$p_is_false($v1);if($v1861){const $v1862=({$:"None"});return $v1862;}else{break $case1860;}}throw "bend: runtime fail-stop";}
function $b327($v0,$td=0){$case1863:{const $v1864=$p_is_string_empty($v0);if($v1864){const $v1865=({$:"None"});return $v1865;}else{break $case1863;}}$case1866:{const $v1867=$p_is_string_nonempty($v0);if($v1867){const $v1868=$p_string_head($v0);const $v1870=$p_string_tail($v0);const $v1872=$p_string_append($v1868,$v1870);{const $a0=$v1872;if($td<64){const $kb=$sp-0,$ki=$split_enter($k1873,$kb);try{return $split_done($b324($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b324,1,$k1873,$sp-0);}}else{break $case1866;}}throw "bend: runtime fail-stop";}
function $k1873($v1873,$base,$td=0){{const $a0=$v1873;$stArgs[$sp++]=$v1873;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1875,$kb);try{return $split_done($b325($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b325,1,$k1875,$sp-1);}}
function $k1875($v1875,$base,$td=0){const $v1873=$stArgs[$base+0];return ($td<64?$b326($v1873,$v1875,$td+1):run_named2($b326,$v1873,$v1875,$td));}
function $b328($v0,$v1,$v2,$v3,$td=0){$case1877:{const $v1878=$p_is_true($v3);if($v1878){return $v1;}else{break $case1877;}}$case1879:{const $v1880=$p_is_false($v3);if($v1880){const $v1881=$p_u32_div($v2,10);const $v1882=$p_u32_mod($v2,10);const $v1883=$p_u32_add(48,$v1882);const $v1884=$p_char_new($v1883);const $v1885=$p_string_append($v1884,$v1);return ($td<64?$b329($v0,$v1881,$v1885,$td+1):run_named3($b329,$v0,$v1881,$v1885,$td));}else{break $case1879;}}throw "bend: runtime fail-stop";}
function $b329($v0,$v1,$v2,$td=0){$case1887:{const $v1888=$p_is_nat_zero($v0);if($v1888){return $v2;}else{break $case1887;}}$case1889:{const $v1890=$p_is_nat_successor($v0);if($v1890){const $v1891=$p_nat_predecessor($v0);const $v1893=$p_u32_is_zero($v1);return ($td<64?$b328($v1891,$v2,$v1,$v1893,$td+1):run_named4($b328,$v1891,$v2,$v1,$v1893,$td));}else{break $case1889;}}throw "bend: runtime fail-stop";}
function $b330($v0,$v1,$td=0){$case1895:{const $v1896=$p_is_true($v1);if($v1896){const $v1897=$p_char_new(48);const $v1898=$p_string_append($v1897,"");return $v1898;}else{break $case1895;}}$case1899:{const $v1900=$p_is_false($v1);if($v1900){return ($td<64?$b329(10,$v0,"",$td+1):run_named3($b329,10,$v0,"",$td));}else{break $case1899;}}throw "bend: runtime fail-stop";}
function $b331($v0,$td=0){const $v1903=$p_u32_is_zero($v0);return ($td<64?$b330($v0,$v1903,$td+1):run_named2($b330,$v0,$v1903,$td));}
function $b332($v0,$v1,$v2,$td=0){$case1905:{const $v1906=$p_is_true($v2);if($v1906){return ($td<64?$b333($v0,$v1,$td+1):run_named2($b333,$v0,$v1,$td));}else{break $case1905;}}$case1908:{const $v1909=$p_is_false($v2);if($v1909){const $v1910=({$:"None"});return $v1910;}else{break $case1908;}}throw "bend: runtime fail-stop";}
function $b333($v0,$v1,$td=0){$case1911:{const $v1912=$p_is_string_empty($v0);if($v1912){const $v1913=({$:"Some","value":$v1});return $v1913;}else{break $case1911;}}$case1914:{const $v1915=$p_is_string_nonempty($v0);if($v1915){const $v1916=$p_string_head($v0);const $v1917=$p_char_code($v1916);const $v1919=$p_string_tail($v0);const $v1921=$p_u32_mul($v1,10);const $v1922=$p_u32_sub($v1917,48);const $v1923=$p_u32_add($v1921,$v1922);const $v1925=$p_u32_div($v1923,10);const $v1926=$p_u32_is_eq($v1925,$v1);return ($td<64?$b332($v1919,$v1923,$v1926,$td+1):run_named3($b332,$v1919,$v1923,$v1926,$td));}else{break $case1914;}}throw "bend: runtime fail-stop";}
function $b334($v0,$td=0){$case1928:{const $v1929=$p_is_string_empty($v0);if($v1929){const $v1930=({$:"None"});return $v1930;}else{break $case1928;}}$case1931:{const $v1932=$p_is_string_nonempty($v0);if($v1932){const $v1933=$p_string_head($v0);const $v1935=$p_string_tail($v0);const $v1937=$p_string_append($v1933,$v1935);return ($td<64?$b333($v1937,0,$td+1):run_named2($b333,$v1937,0,$td));}else{break $case1931;}}throw "bend: runtime fail-stop";}
function $b335($v0,$td=0){$case1939:{const $v1940=$p_is_false($v0);if($v1940){return "False";}else{break $case1939;}}$case1941:{const $v1942=$p_is_true($v0);if($v1942){return "True";}else{break $case1941;}}throw "bend: runtime fail-stop";}
function $b336($v0,$td=0){const $v1943=$p_string_append($v0,"");return $v1943;}
function $b337($v1,$v2,$td=0){$case1944:{const $v1945=($v2&&$v2.$==="Tuple");if($v1945){const $v1946=$v2.fst;const $v1948=$v2.snd;const $v1950=$p_array_node($v1946,$v1);const $v1951=$p_u32_shl($v1948);const $v1952=({$:"Tuple","fst":$v1950,"snd":$v1951});return $v1952;}else{break $case1944;}}throw "bend: runtime fail-stop";}
function $b339($v1,$v2,$td=0){$case1953:{const $v1954=($v2&&$v2.$==="Tuple");if($v1954){const $v1955=$v2.fst;const $v1957=$v2.snd;const $v1959=$p_array_node($v1955,$v1);const $v1960=({$:"Tuple","fst":$v1959,"snd":$v1957});return $v1960;}else{break $case1953;}}throw "bend: runtime fail-stop";}
function $b340($v1,$v2,$td=0){$case1961:{const $v1962=($v2&&$v2.$==="Tuple");if($v1962){const $v1963=$v2.fst;const $v1965=$v2.snd;const $v1967=$p_array_node($v1,$v1963);const $v1968=({$:"Tuple","fst":$v1967,"snd":$v1965});return $v1968;}else{break $case1961;}}throw "bend: runtime fail-stop";}
function $b341($v1,$v2,$v3,$v4,$v5,$td=0){$case1969:{const $v1970=$p_is_array_leaf($v1);if($v1970){const $v1971=$p_array_leaf_value($v1);const $v1974=$p_array_leaf($v4);const $v1975=({$:"Tuple","fst":$v1974,"snd":$v1971});return $v1975;}else{break $case1969;}}$case1976:{const $v1977=$p_is_array_node($v1);if($v1977){const $v1978=$p_array_left($v1);const $v1980=$p_array_right($v1);const $v1982=$p_is_true($v5);if($v1982){const $v1983=$p_u32_shr($v2);const $v1985=$p_u32_shr($v1983);const $v1986=$p_u32_is_lt($v3,$v1985);{const $a0=$v1978,$a1=$v1983,$a2=$v3,$a3=$v4,$a4=$v1986;$stArgs[$sp++]=$v1980;if($td<64){const $kb=$sp-1,$ki=$split_enter($k1987,$kb);try{return $split_done($b341($a0,$a1,$a2,$a3,$a4,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;$tailArgs[4]=$a4;return $split($b341,5,$k1987,$sp-1);}}else{break $case1976;}}else{break $case1976;}}$case1989:{const $v1990=$p_is_array_node($v1);if($v1990){const $v1991=$p_array_left($v1);const $v1993=$p_array_right($v1);const $v1995=$p_is_false($v5);if($v1995){const $v1996=$p_u32_shr($v2);const $v1998=$p_u32_sub($v3,$v1996);const $v2000=$p_u32_shr($v1996);const $v2001=$p_u32_is_lt($v1998,$v2000);{const $a0=$v1993,$a1=$v1996,$a2=$v1998,$a3=$v4,$a4=$v2001;$stArgs[$sp++]=$v1991;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2002,$kb);try{return $split_done($b341($a0,$a1,$a2,$a3,$a4,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;$tailArgs[4]=$a4;return $split($b341,5,$k2002,$sp-1);}}else{break $case1989;}}else{break $case1989;}}throw "bend: runtime fail-stop";}
function $k1987($v1987,$base,$td=0){const $v1980=$stArgs[$base+0];return ($td<64?$b339($v1980,$v1987,$td+1):run_named2($b339,$v1980,$v1987,$td));}
function $k2002($v2002,$base,$td=0){const $v1991=$stArgs[$base+0];return ($td<64?$b340($v1991,$v2002,$td+1):run_named2($b340,$v1991,$v2002,$td));}
function $b342($v1,$v2,$v3,$td=0){$case2004:{const $v2005=($v3&&$v3.$==="Tuple");if($v2005){const $v2006=$v3.fst;const $v2008=$v3.snd;const $v2010=$p_u32_sub($v2008,1);const $v2011=$p_u32_and($v1,$v2010);const $v2013=$p_u32_shr($v2008);const $v2014=$p_u32_is_lt($v2011,$v2013);return ($td<64?$b341($v2006,$v2008,$v2011,$v2,$v2014,$td+1):run_named5($b341,$v2006,$v2008,$v2011,$v2,$v2014,$td));}else{break $case2004;}}throw "bend: runtime fail-stop";}
function $b473($c0,$c1,$v2022,$td=0){$case2023:{const $v2024=($v2022&&$v2022.$==="Tuple");if($v2024){const $v2025=$v2022.fst;const $v2027=$v2022.snd;const $v2029=$p_array_node($c0,$v2025);const $v2030=$p_array_node($c1,$v2027);const $v2031=({$:"Tuple","fst":$v2029,"snd":$v2030});return $v2031;}else{break $case2023;}}throw "bend: runtime fail-stop";}
function $b344($v1,$v2,$td=0){$case2016:{const $v2017=($v1&&$v1.$==="Tuple");if($v2017){const $v2018=$v1.fst;const $v2020=$v1.snd;return ($td<64?$b473($v2018,$v2020,$v2,$td+1):run_named3($b473,$v2018,$v2020,$v2,$td));}else{break $case2016;}}throw "bend: runtime fail-stop";}
function $b346($v1,$td=0){const $v2033=({$:"Tuple","fst":$v1,"snd":$v1});return $v2033;}
function $b347($v1,$v2,$td=0){return $v1;}
function $b358($v1,$td=0){$case2034:{const $v2035=($v1&&$v1.$==="Tuple");if($v2035){const $v2036=$v1.fst;const $v2038=$v1.snd;return $v2036;}else{break $case2034;}}throw "bend: runtime fail-stop";}
function $b360($v1,$v2,$v3,$v4,$td=0){$case2040:{const $v2041=$p_is_array_leaf($v1);if($v2041){const $v2042=$p_array_leaf_value($v1);const $v2045=$p_array_leaf($v2042);const $v2046=({$:"Tuple","fst":$v2045,"snd":$v2042});return $v2046;}else{break $case2040;}}$case2047:{const $v2048=$p_is_array_node($v1);if($v2048){const $v2049=$p_array_left($v1);const $v2051=$p_array_right($v1);const $v2053=$p_is_true($v4);if($v2053){const $v2054=$p_u32_shr($v2);const $v2056=$p_u32_shr($v2054);const $v2057=$p_u32_is_lt($v3,$v2056);{const $a0=$v2049,$a1=$v2054,$a2=$v3,$a3=$v2057;$stArgs[$sp++]=$v2051;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2058,$kb);try{return $split_done($b360($a0,$a1,$a2,$a3,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;return $split($b360,4,$k2058,$sp-1);}}else{break $case2047;}}else{break $case2047;}}$case2060:{const $v2061=$p_is_array_node($v1);if($v2061){const $v2062=$p_array_left($v1);const $v2064=$p_array_right($v1);const $v2066=$p_is_false($v4);if($v2066){const $v2067=$p_u32_shr($v2);const $v2069=$p_u32_sub($v3,$v2067);const $v2071=$p_u32_shr($v2067);const $v2072=$p_u32_is_lt($v2069,$v2071);{const $a0=$v2064,$a1=$v2067,$a2=$v2069,$a3=$v2072;$stArgs[$sp++]=$v2062;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2073,$kb);try{return $split_done($b360($a0,$a1,$a2,$a3,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;return $split($b360,4,$k2073,$sp-1);}}else{break $case2060;}}else{break $case2060;}}throw "bend: runtime fail-stop";}
function $k2058($v2058,$base,$td=0){const $v2051=$stArgs[$base+0];return ($td<64?$b339($v2051,$v2058,$td+1):run_named2($b339,$v2051,$v2058,$td));}
function $k2073($v2073,$base,$td=0){const $v2062=$stArgs[$base+0];return ($td<64?$b340($v2062,$v2073,$td+1):run_named2($b340,$v2062,$v2073,$td));}
function $b361($v1,$v2,$td=0){$case2075:{const $v2076=($v2&&$v2.$==="Tuple");if($v2076){const $v2077=$v2.fst;const $v2079=$v2.snd;const $v2081=$p_u32_sub($v2079,1);const $v2082=$p_u32_and($v1,$v2081);const $v2084=$p_u32_shr($v2079);const $v2085=$p_u32_is_lt($v2082,$v2084);return ($td<64?$b360($v2077,$v2079,$v2082,$v2085,$td+1):run_named4($b360,$v2077,$v2079,$v2082,$v2085,$td));}else{break $case2075;}}throw "bend: runtime fail-stop";}
function $b363($v0,$v1,$td=0){const $v2087=$p_u32_shrn($v0,$v1);const $v2088=$p_u32_and($v2087,1);const $v2089=$p_u32_is_ne($v2088,0);return $v2089;}
function $b364($v0,$v1,$td=0){$case2090:{const $v2091=$p_char_code($v0);const $v2093=$p_is_nat_zero($v1);if($v2093){const $v2094=$p_char_new($v2091);const $v2095=({$:"Tuple","fst":$v2094,"snd":true});return $v2095;}else{break $case2090;}}$case2096:{const $v2097=$p_char_code($v0);const $v2099=$p_is_nat_successor($v1);if($v2099){const $v2100=$p_nat_predecessor($v1);const $v2102=$p_char_new($v2097);const $v2103=$p_nat_sub(31,$v2100);{const $a0=$v2097,$a1=$v2103;$stArgs[$sp++]=$v2102;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2104,$kb);try{return $split_done($b363($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b363,2,$k2104,$sp-1);}}else{break $case2096;}}throw "bend: runtime fail-stop";}
function $k2104($v2104,$base,$td=0){const $v2102=$stArgs[$base+0];const $v2105=({$:"Tuple","fst":$v2102,"snd":$v2104});return $v2105;}
function $b365($v0,$v1,$td=0){$case2106:{const $v2107=($v1&&$v1.$==="Tuple");if($v2107){const $v2108=$v1.fst;const $v2110=$v1.snd;const $v2112=$p_string_append($v2108,$v0);const $v2113=({$:"Tuple","fst":$v2112,"snd":$v2110});return $v2113;}else{break $case2106;}}throw "bend: runtime fail-stop";}
function $b366($v0,$v1,$td=0){$case2114:{const $v2115=($v1&&$v1.$==="Tuple");if($v2115){const $v2116=$v1.fst;const $v2118=$v1.snd;const $v2120=$p_string_append($v0,$v2116);const $v2121=({$:"Tuple","fst":$v2120,"snd":$v2118});return $v2121;}else{break $case2114;}}throw "bend: runtime fail-stop";}
function $b474($c0,$c1,$c2,$v2131,$td=0){$case2132:{const $v2133=$p_is_nat_zero($v2131);if($v2133){{const $a0=$c1,$a1=$c2;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2134,$kb);try{return $split_done($b364($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b364,2,$k2134,$sp-1);}}else{break $case2132;}}$case2136:{const $v2137=$p_is_nat_successor($v2131);if($v2137){const $v2138=$p_nat_predecessor($v2131);{const $a0=$c0,$a1=$v2138,$a2=$c2;$stArgs[$sp++]=$c1;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2140,$kb);try{return $split_done($b367($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b367,3,$k2140,$sp-1);}}else{break $case2136;}}throw "bend: runtime fail-stop";}
function $k2134($v2134,$base,$td=0){const $c0=$stArgs[$base+0];return ($td<64?$b365($c0,$v2134,$td+1):run_named2($b365,$c0,$v2134,$td));}
function $k2140($v2140,$base,$td=0){const $c1=$stArgs[$base+0];return ($td<64?$b366($c1,$v2140,$td+1):run_named2($b366,$c1,$v2140,$td));}
function $b367($v0,$v1,$v2,$td=0){$case2122:{const $v2123=$p_is_string_empty($v0);if($v2123){const $v2124=({$:"Tuple","fst":"","snd":false});return $v2124;}else{break $case2122;}}$case2125:{const $v2126=$p_is_string_nonempty($v0);if($v2126){const $v2127=$p_string_head($v0);const $v2129=$p_string_tail($v0);return ($td<64?$b474($v2129,$v2127,$v2,$v1,$td+1):run_named4($b474,$v2129,$v2127,$v2,$v1,$td));}else{break $case2125;}}throw "bend: runtime fail-stop";}
function $b368($v0,$v1,$td=0){$case2143:{const $v2144=($v1&&$v1.$==="Tuple");if($v2144){const $v2145=$v1.fst;const $v2147=$v1.snd;return ($td<64?$b367($v0,$v2145,$v2147,$td+1):run_named3($b367,$v0,$v2145,$v2147,$td));}else{break $case2143;}}throw "bend: runtime fail-stop";}
function $b370($v0,$v1,$v2,$td=0){$case2150:{const $v2151=$p_is_true($v2);if($v2151){return 0;}else{break $case2150;}}$case2152:{const $v2153=$p_is_false($v2);if($v2153){const $v2154=$p_u32_shr($v1);{const $a0=$v0,$a1=$v2154;if($td<64){const $kb=$sp-0,$ki=$split_enter($k2155,$kb);try{return $split_done($b371($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b371,2,$k2155,$sp-0);}}else{break $case2152;}}throw "bend: runtime fail-stop";}
function $k2155($v2155,$base,$td=0){const $v2156=$p_nat_add(1,$v2155);return $v2156;}
function $b371($v0,$v1,$td=0){$case2157:{const $v2158=$p_is_nat_zero($v0);if($v2158){return 0;}else{break $case2157;}}$case2159:{const $v2160=$p_is_nat_successor($v0);if($v2160){const $v2161=$p_nat_predecessor($v0);const $v2163=$p_u32_is_zero($v1);return ($td<64?$b370($v2161,$v1,$v2163,$td+1):run_named3($b370,$v2161,$v1,$v2163,$td));}else{break $case2159;}}throw "bend: runtime fail-stop";}
function $b372($v0,$td=0){{const $a0=32,$a1=$v0;if($td<64){const $kb=$sp-0,$ki=$split_enter($k2165,$kb);try{return $split_done($b371($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b371,2,$k2165,$sp-0);}}
function $k2165($v2165,$base,$td=0){const $v2166=$p_nat_sub(33,$v2165);return $v2166;}
function $b373($v0,$v1,$td=0){$case2167:{const $v2168=$p_char_code($v0);const $v2170=$p_char_code($v1);const $v2172=$p_u32_xor($v2168,$v2170);{const $a0=$v2172;$stArgs[$sp++]=$v2168;$stArgs[$sp++]=$v2170;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2173,$kb);try{return $split_done($b372($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b372,1,$k2173,$sp-2);}}throw "bend: runtime fail-stop";}
function $k2173($v2173,$base,$td=0){const $v2168=$stArgs[$base+0];const $v2170=$stArgs[$base+1];const $v2174=$p_u32_is_eq($v2168,$v2170);const $v2175=({$:"Tuple","fst":$v2173,"snd":$v2174});return $v2175;}
function $b475($c0,$c1,$c2,$v2182,$td=0){$case2183:{const $v2184=$p_is_true($v2182);if($v2184){{const $a0=$c0,$a1=$c1;if($td<64){const $kb=$sp-0,$ki=$split_enter($k2185,$kb);try{return $split_done($b375($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b375,2,$k2185,$sp-0);}}else{break $case2183;}}$case2187:{const $v2188=$p_is_false($v2182);if($v2188){return $c2;}else{break $case2187;}}throw "bend: runtime fail-stop";}
function $k2185($v2185,$base,$td=0){const $v2186=$p_nat_add(33,$v2185);return $v2186;}
function $b374($v0,$v1,$v2,$td=0){$case2176:{const $v2177=($v2&&$v2.$==="Tuple");if($v2177){const $v2178=$v2.fst;const $v2180=$v2.snd;return ($td<64?$b475($v0,$v1,$v2178,$v2180,$td+1):run_named4($b475,$v0,$v1,$v2178,$v2180,$td));}else{break $case2176;}}throw "bend: runtime fail-stop";}
function $b375($v0,$v1,$td=0){$case2190:{const $v2191=$p_is_string_empty($v0);if($v2191){return 0;}else{break $case2190;}}$case2193:{const $v2194=$p_is_string_nonempty($v0);if($v2194){const $v2195=$p_string_head($v0);const $v2197=$p_string_tail($v0);const $v2199=$p_is_string_empty($v1);if($v2199){return 0;}else{break $case2193;}}else{break $case2193;}}$case2200:{const $v2201=$p_is_string_nonempty($v0);if($v2201){const $v2202=$p_string_head($v0);const $v2204=$p_string_tail($v0);const $v2206=$p_is_string_nonempty($v1);if($v2206){const $v2207=$p_string_head($v1);const $v2209=$p_string_tail($v1);{const $a0=$v2202,$a1=$v2207;$stArgs[$sp++]=$v2204;$stArgs[$sp++]=$v2209;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2211,$kb);try{return $split_done($b373($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b373,2,$k2211,$sp-2);}}else{break $case2200;}}else{break $case2200;}}throw "bend: runtime fail-stop";}
function $k2211($v2211,$base,$td=0){const $v2204=$stArgs[$base+0];const $v2209=$stArgs[$base+1];return ($td<64?$b374($v2204,$v2209,$v2211,$td+1):run_named3($b374,$v2204,$v2209,$v2211,$td));}
function $b377($v2,$v3,$v4,$td=0){$case2214:{const $v2215=($v2&&$v2.$==="MNode");if($v2215){const $v2216=$v2.pos;const $v2218=$v2.lo;const $v2219=($v2218&&$v2218.$==="MTip");if($v2219){const $v2220=$v2.hi;const $v2222=($v4&&$v4.$==="Tuple");if($v2222){const $v2223=$v4.fst;const $v2225=$v4.snd;const $v2226=$p_is_false($v2225);if($v2226){const $v2227=({$:"MLeaf","key":$v2223,"val":$v3});const $v2228=({$:"MNode","pos":$v2216,"lo":$v2227,"hi":$v2220});return $v2228;}else{break $case2214;}}else{break $case2214;}}else{break $case2214;}}else{break $case2214;}}$case2229:{const $v2230=($v2&&$v2.$==="MNode");if($v2230){const $v2231=$v2.pos;const $v2233=$v2.lo;const $v2234=($v2233&&$v2233.$==="MLeaf");if($v2234){const $v2235=$v2233.key;const $v2237=$v2233.val;const $v2239=$v2.hi;const $v2241=($v4&&$v4.$==="Tuple");if($v2241){const $v2242=$v4.fst;const $v2244=$v4.snd;const $v2245=$p_is_false($v2244);if($v2245){const $v2246=({$:"MLeaf","key":$v2235,"val":$v3});const $v2247=({$:"MNode","pos":$v2231,"lo":$v2246,"hi":$v2239});return $v2247;}else{break $case2229;}}else{break $case2229;}}else{break $case2229;}}else{break $case2229;}}$case2248:{const $v2249=($v2&&$v2.$==="MNode");if($v2249){const $v2250=$v2.pos;const $v2252=$v2.lo;const $v2253=($v2252&&$v2252.$==="MNode");if($v2253){const $v2254=$v2252.pos;const $v2256=$v2252.lo;const $v2258=$v2252.hi;const $v2260=$v2.hi;const $v2262=($v4&&$v4.$==="Tuple");if($v2262){const $v2263=$v4.fst;const $v2265=$v4.snd;const $v2266=$p_is_false($v2265);if($v2266){const $v2267=({$:"MNode","pos":$v2254,"lo":$v2256,"hi":$v2258});const $v2268=$p_map_bit($v2263,$v2254);{const $a0=$v2267,$a1=$v3,$a2=$v2268;$stArgs[$sp++]=$v2250;$stArgs[$sp++]=$v2260;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2269,$kb);try{return $split_done($b377($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b377,3,$k2269,$sp-2);}}else{break $case2248;}}else{break $case2248;}}else{break $case2248;}}else{break $case2248;}}$case2271:{const $v2272=($v2&&$v2.$==="MNode");if($v2272){const $v2273=$v2.pos;const $v2275=$v2.lo;const $v2277=$v2.hi;const $v2278=($v2277&&$v2277.$==="MTip");if($v2278){const $v2279=($v4&&$v4.$==="Tuple");if($v2279){const $v2280=$v4.fst;const $v2282=$v4.snd;const $v2283=$p_is_true($v2282);if($v2283){const $v2284=({$:"MLeaf","key":$v2280,"val":$v3});const $v2285=({$:"MNode","pos":$v2273,"lo":$v2275,"hi":$v2284});return $v2285;}else{break $case2271;}}else{break $case2271;}}else{break $case2271;}}else{break $case2271;}}$case2286:{const $v2287=($v2&&$v2.$==="MNode");if($v2287){const $v2288=$v2.pos;const $v2290=$v2.lo;const $v2292=$v2.hi;const $v2293=($v2292&&$v2292.$==="MLeaf");if($v2293){const $v2294=$v2292.key;const $v2296=$v2292.val;const $v2298=($v4&&$v4.$==="Tuple");if($v2298){const $v2299=$v4.fst;const $v2301=$v4.snd;const $v2302=$p_is_true($v2301);if($v2302){const $v2303=({$:"MLeaf","key":$v2294,"val":$v3});const $v2304=({$:"MNode","pos":$v2288,"lo":$v2290,"hi":$v2303});return $v2304;}else{break $case2286;}}else{break $case2286;}}else{break $case2286;}}else{break $case2286;}}$case2305:{const $v2306=($v2&&$v2.$==="MNode");if($v2306){const $v2307=$v2.pos;const $v2309=$v2.lo;const $v2311=$v2.hi;const $v2312=($v2311&&$v2311.$==="MNode");if($v2312){const $v2313=$v2311.pos;const $v2315=$v2311.lo;const $v2317=$v2311.hi;const $v2319=($v4&&$v4.$==="Tuple");if($v2319){const $v2320=$v4.fst;const $v2322=$v4.snd;const $v2323=$p_is_true($v2322);if($v2323){const $v2324=({$:"MNode","pos":$v2313,"lo":$v2315,"hi":$v2317});const $v2325=$p_map_bit($v2320,$v2313);{const $a0=$v2324,$a1=$v3,$a2=$v2325;$stArgs[$sp++]=$v2307;$stArgs[$sp++]=$v2309;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2326,$kb);try{return $split_done($b377($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b377,3,$k2326,$sp-2);}}else{break $case2305;}}else{break $case2305;}}else{break $case2305;}}else{break $case2305;}}$case2328:{return $v2;}throw "bend: runtime fail-stop";}
function $k2269($v2269,$base,$td=0){const $v2250=$stArgs[$base+0];const $v2260=$stArgs[$base+1];const $v2270=({$:"MNode","pos":$v2250,"lo":$v2269,"hi":$v2260});return $v2270;}
function $k2326($v2326,$base,$td=0){const $v2307=$stArgs[$base+0];const $v2309=$stArgs[$base+1];const $v2327=({$:"MNode","pos":$v2307,"lo":$v2309,"hi":$v2326});return $v2327;}
function $b378($v2,$v3,$v4,$td=0){switch($v2?.$){case "MTip":{$case2331:{const $v2332=true;const $v2333=({$:"MLeaf","key":$v3,"val":$v4});return $v2333;}break;}case "MLeaf":{$case2334:{const $v2335=true;const $v2336=$v2.key;const $v2338=$v2.val;const $v2340=({$:"MLeaf","key":$v2336,"val":$v4});return $v2340;}break;}case "MNode":{$case2341:{const $v2342=true;const $v2343=$v2.pos;const $v2345=$v2.lo;const $v2347=$v2.hi;const $v2349=({$:"MNode","pos":$v2343,"lo":$v2345,"hi":$v2347});const $v2350=$p_map_bit($v3,$v2343);return ($td<64?$b377($v2349,$v4,$v2350,$td+1):run_named3($b377,$v2349,$v4,$v2350,$td));}break;}}throw "bend: runtime fail-stop";}
function $b476($c0,$c1,$c2,$c3,$v2358,$td=0){$case2359:{const $v2360=$p_is_false($v2358);if($v2360){const $v2361=({$:"MLeaf","key":$c1,"val":$c2});const $v2362=({$:"MNode","pos":$c0,"lo":$v2361,"hi":$c3});return $v2362;}else{break $case2359;}}$case2363:{const $v2364=$p_is_true($v2358);if($v2364){const $v2365=({$:"MLeaf","key":$c1,"val":$c2});const $v2366=({$:"MNode","pos":$c0,"lo":$c3,"hi":$v2365});return $v2366;}else{break $case2363;}}throw "bend: runtime fail-stop";}
function $b379($v2,$v3,$v4,$v5,$td=0){$case2352:{const $v2353=($v5&&$v5.$==="Tuple");if($v2353){const $v2354=$v5.fst;const $v2356=$v5.snd;return ($td<64?$b476($v4,$v2354,$v2,$v3,$v2356,$td+1):run_named5($b476,$v4,$v2354,$v2,$v3,$v2356,$td));}else{break $case2352;}}throw "bend: runtime fail-stop";}
function $b380($v2,$v3,$v4,$v5,$td=0){const $v2368=$p_map_bit($v3,$v2);return ($td<64?$b379($v4,$v5,$v2,$v2368,$td+1):run_named4($b379,$v4,$v5,$v2,$v2368,$td));}
function $b381($v2,$v3,$v4,$v5,$v6,$td=0){$case2370:{const $v2371=($v2&&$v2.$==="MNode");if($v2371){const $v2372=$v2.pos;const $v2374=$v2.lo;const $v2376=$v2.hi;const $v2378=($v5&&$v5.$==="Tuple");if($v2378){const $v2379=$v5.fst;const $v2381=$v5.snd;const $v2383=$p_is_false($v6);if($v2383){const $v2384=({$:"MNode","pos":$v2372,"lo":$v2374,"hi":$v2376});return ($td<64?$b380($v4,$v2379,$v3,$v2384,$td+1):run_named4($b380,$v4,$v2379,$v3,$v2384,$td));}else{break $case2370;}}else{break $case2370;}}else{break $case2370;}}$case2386:{const $v2387=($v2&&$v2.$==="MNode");if($v2387){const $v2388=$v2.pos;const $v2390=$v2.lo;const $v2391=($v2390&&$v2390.$==="MTip");if($v2391){const $v2392=$v2.hi;const $v2394=($v5&&$v5.$==="Tuple");if($v2394){const $v2395=$v5.fst;const $v2397=$v5.snd;const $v2398=$p_is_false($v2397);if($v2398){const $v2399=$p_is_true($v6);if($v2399){const $v2400=({$:"MLeaf","key":$v2395,"val":$v3});const $v2401=({$:"MNode","pos":$v2388,"lo":$v2400,"hi":$v2392});return $v2401;}else{break $case2386;}}else{break $case2386;}}else{break $case2386;}}else{break $case2386;}}else{break $case2386;}}$case2402:{const $v2403=($v2&&$v2.$==="MNode");if($v2403){const $v2404=$v2.pos;const $v2406=$v2.lo;const $v2407=($v2406&&$v2406.$==="MLeaf");if($v2407){const $v2408=$v2406.key;const $v2410=$v2406.val;const $v2412=$v2.hi;const $v2414=($v5&&$v5.$==="Tuple");if($v2414){const $v2415=$v5.fst;const $v2417=$v5.snd;const $v2418=$p_is_false($v2417);if($v2418){const $v2419=$p_is_true($v6);if($v2419){const $v2420=({$:"MLeaf","key":$v2408,"val":$v2410});{const $a0=$v4,$a1=$v2415,$a2=$v3,$a3=$v2420;$stArgs[$sp++]=$v2404;$stArgs[$sp++]=$v2412;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2421,$kb);try{return $split_done($b380($a0,$a1,$a2,$a3,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;return $split($b380,4,$k2421,$sp-2);}}else{break $case2402;}}else{break $case2402;}}else{break $case2402;}}else{break $case2402;}}else{break $case2402;}}$case2423:{const $v2424=($v2&&$v2.$==="MNode");if($v2424){const $v2425=$v2.pos;const $v2427=$v2.lo;const $v2428=($v2427&&$v2427.$==="MNode");if($v2428){const $v2429=$v2427.pos;const $v2431=$v2427.lo;const $v2433=$v2427.hi;const $v2435=$v2.hi;const $v2437=($v5&&$v5.$==="Tuple");if($v2437){const $v2438=$v5.fst;const $v2440=$v5.snd;const $v2441=$p_is_false($v2440);if($v2441){const $v2442=$p_is_true($v6);if($v2442){const $v2443=({$:"MNode","pos":$v2429,"lo":$v2431,"hi":$v2433});const $v2444=$p_map_bit($v2438,$v2429);const $v2445=$p_nat_is_lt($v2429,$v4);{const $a0=$v2443,$a1=$v3,$a2=$v4,$a3=$v2444,$a4=$v2445;$stArgs[$sp++]=$v2425;$stArgs[$sp++]=$v2435;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2446,$kb);try{return $split_done($b381($a0,$a1,$a2,$a3,$a4,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;$tailArgs[4]=$a4;return $split($b381,5,$k2446,$sp-2);}}else{break $case2423;}}else{break $case2423;}}else{break $case2423;}}else{break $case2423;}}else{break $case2423;}}$case2448:{const $v2449=($v2&&$v2.$==="MNode");if($v2449){const $v2450=$v2.pos;const $v2452=$v2.lo;const $v2454=$v2.hi;const $v2455=($v2454&&$v2454.$==="MTip");if($v2455){const $v2456=($v5&&$v5.$==="Tuple");if($v2456){const $v2457=$v5.fst;const $v2459=$v5.snd;const $v2460=$p_is_true($v2459);if($v2460){const $v2461=$p_is_true($v6);if($v2461){const $v2462=({$:"MLeaf","key":$v2457,"val":$v3});const $v2463=({$:"MNode","pos":$v2450,"lo":$v2452,"hi":$v2462});return $v2463;}else{break $case2448;}}else{break $case2448;}}else{break $case2448;}}else{break $case2448;}}else{break $case2448;}}$case2464:{const $v2465=($v2&&$v2.$==="MNode");if($v2465){const $v2466=$v2.pos;const $v2468=$v2.lo;const $v2470=$v2.hi;const $v2471=($v2470&&$v2470.$==="MLeaf");if($v2471){const $v2472=$v2470.key;const $v2474=$v2470.val;const $v2476=($v5&&$v5.$==="Tuple");if($v2476){const $v2477=$v5.fst;const $v2479=$v5.snd;const $v2480=$p_is_true($v2479);if($v2480){const $v2481=$p_is_true($v6);if($v2481){const $v2482=({$:"MLeaf","key":$v2472,"val":$v2474});{const $a0=$v4,$a1=$v2477,$a2=$v3,$a3=$v2482;$stArgs[$sp++]=$v2466;$stArgs[$sp++]=$v2468;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2483,$kb);try{return $split_done($b380($a0,$a1,$a2,$a3,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;return $split($b380,4,$k2483,$sp-2);}}else{break $case2464;}}else{break $case2464;}}else{break $case2464;}}else{break $case2464;}}else{break $case2464;}}$case2485:{const $v2486=($v2&&$v2.$==="MNode");if($v2486){const $v2487=$v2.pos;const $v2489=$v2.lo;const $v2491=$v2.hi;const $v2492=($v2491&&$v2491.$==="MNode");if($v2492){const $v2493=$v2491.pos;const $v2495=$v2491.lo;const $v2497=$v2491.hi;const $v2499=($v5&&$v5.$==="Tuple");if($v2499){const $v2500=$v5.fst;const $v2502=$v5.snd;const $v2503=$p_is_true($v2502);if($v2503){const $v2504=$p_is_true($v6);if($v2504){const $v2505=({$:"MNode","pos":$v2493,"lo":$v2495,"hi":$v2497});const $v2506=$p_map_bit($v2500,$v2493);const $v2507=$p_nat_is_lt($v2493,$v4);{const $a0=$v2505,$a1=$v3,$a2=$v4,$a3=$v2506,$a4=$v2507;$stArgs[$sp++]=$v2487;$stArgs[$sp++]=$v2489;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2508,$kb);try{return $split_done($b381($a0,$a1,$a2,$a3,$a4,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;$tailArgs[3]=$a3;$tailArgs[4]=$a4;return $split($b381,5,$k2508,$sp-2);}}else{break $case2485;}}else{break $case2485;}}else{break $case2485;}}else{break $case2485;}}else{break $case2485;}}$case2510:{return $v2;}throw "bend: runtime fail-stop";}
function $k2421($v2421,$base,$td=0){const $v2404=$stArgs[$base+0];const $v2412=$stArgs[$base+1];const $v2422=({$:"MNode","pos":$v2404,"lo":$v2421,"hi":$v2412});return $v2422;}
function $k2446($v2446,$base,$td=0){const $v2425=$stArgs[$base+0];const $v2435=$stArgs[$base+1];const $v2447=({$:"MNode","pos":$v2425,"lo":$v2446,"hi":$v2435});return $v2447;}
function $k2483($v2483,$base,$td=0){const $v2466=$stArgs[$base+0];const $v2468=$stArgs[$base+1];const $v2484=({$:"MNode","pos":$v2466,"lo":$v2468,"hi":$v2483});return $v2484;}
function $k2508($v2508,$base,$td=0){const $v2487=$stArgs[$base+0];const $v2489=$stArgs[$base+1];const $v2509=({$:"MNode","pos":$v2487,"lo":$v2489,"hi":$v2508});return $v2509;}
function $b382($v2,$v3,$v4,$v5,$td=0){switch($v2?.$){case "MTip":{$case2514:{const $v2515=true;const $v2516=({$:"MLeaf","key":$v3,"val":$v4});return $v2516;}break;}case "MLeaf":{$case2517:{const $v2518=true;const $v2519=$v2.key;const $v2521=$v2.val;const $v2523=({$:"MLeaf","key":$v2519,"val":$v2521});return ($td<64?$b380($v5,$v3,$v4,$v2523,$td+1):run_named4($b380,$v5,$v3,$v4,$v2523,$td));}break;}case "MNode":{$case2525:{const $v2526=true;const $v2527=$v2.pos;const $v2529=$v2.lo;const $v2531=$v2.hi;const $v2533=({$:"MNode","pos":$v2527,"lo":$v2529,"hi":$v2531});const $v2534=$p_map_bit($v3,$v2527);const $v2535=$p_nat_is_lt($v2527,$v5);return ($td<64?$b381($v2533,$v4,$v5,$v2534,$v2535,$td+1):run_named5($b381,$v2533,$v4,$v5,$v2534,$v2535,$td));}break;}}throw "bend: runtime fail-stop";}
function $b383($v3,$v4,$v5,$td=0){$case2537:{const $v2538=($v5&&$v5.$==="Tuple");if($v2538){const $v2539=$v5.fst;const $v2541=$v5.snd;const $v2543=({$:"MNode","pos":$v3,"lo":$v2539,"hi":$v4});const $v2544=({$:"Tuple","fst":$v2543,"snd":$v2541});return $v2544;}else{break $case2537;}}throw "bend: runtime fail-stop";}
function $b384($v3,$v4,$v5,$td=0){$case2545:{const $v2546=($v5&&$v5.$==="Tuple");if($v2546){const $v2547=$v5.fst;const $v2549=$v5.snd;const $v2551=({$:"MNode","pos":$v3,"lo":$v4,"hi":$v2547});const $v2552=({$:"Tuple","fst":$v2551,"snd":$v2549});return $v2552;}else{break $case2545;}}throw "bend: runtime fail-stop";}
function $b385($v2,$v3,$td=0){$case2553:{const $v2554=($v2&&$v2.$==="MNode");if($v2554){const $v2555=$v2.pos;const $v2557=$v2.lo;const $v2558=($v2557&&$v2557.$==="MTip");if($v2558){const $v2559=$v2.hi;const $v2561=($v3&&$v3.$==="Tuple");if($v2561){const $v2562=$v3.fst;const $v2564=$v3.snd;const $v2565=$p_is_false($v2564);if($v2565){const $v2566=({$:"MTip"});const $v2567=({$:"MNode","pos":$v2555,"lo":$v2566,"hi":$v2559});const $v2568=({$:"None"});const $v2569=({$:"Tuple","fst":$v2562,"snd":$v2568});const $v2570=({$:"Tuple","fst":$v2567,"snd":$v2569});return $v2570;}else{break $case2553;}}else{break $case2553;}}else{break $case2553;}}else{break $case2553;}}$case2571:{const $v2572=($v2&&$v2.$==="MNode");if($v2572){const $v2573=$v2.pos;const $v2575=$v2.lo;const $v2576=($v2575&&$v2575.$==="MLeaf");if($v2576){const $v2577=$v2575.key;const $v2579=$v2575.val;const $v2581=$v2.hi;const $v2583=($v3&&$v3.$==="Tuple");if($v2583){const $v2584=$v3.fst;const $v2586=$v3.snd;const $v2587=$p_is_false($v2586);if($v2587){const $v2588=({$:"MLeaf","key":$v2577,"val":$v2579});const $v2589=({$:"MNode","pos":$v2573,"lo":$v2588,"hi":$v2581});const $v2590=({$:"Some","value":$v2577});const $v2591=({$:"Tuple","fst":$v2584,"snd":$v2590});const $v2592=({$:"Tuple","fst":$v2589,"snd":$v2591});return $v2592;}else{break $case2571;}}else{break $case2571;}}else{break $case2571;}}else{break $case2571;}}$case2593:{const $v2594=($v2&&$v2.$==="MNode");if($v2594){const $v2595=$v2.pos;const $v2597=$v2.lo;const $v2598=($v2597&&$v2597.$==="MNode");if($v2598){const $v2599=$v2597.pos;const $v2601=$v2597.lo;const $v2603=$v2597.hi;const $v2605=$v2.hi;const $v2607=($v3&&$v3.$==="Tuple");if($v2607){const $v2608=$v3.fst;const $v2610=$v3.snd;const $v2611=$p_is_false($v2610);if($v2611){const $v2612=({$:"MNode","pos":$v2599,"lo":$v2601,"hi":$v2603});const $v2613=$p_map_bit($v2608,$v2599);{const $a0=$v2612,$a1=$v2613;$stArgs[$sp++]=$v2595;$stArgs[$sp++]=$v2605;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2614,$kb);try{return $split_done($b385($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b385,2,$k2614,$sp-2);}}else{break $case2593;}}else{break $case2593;}}else{break $case2593;}}else{break $case2593;}}$case2616:{const $v2617=($v2&&$v2.$==="MNode");if($v2617){const $v2618=$v2.pos;const $v2620=$v2.lo;const $v2622=$v2.hi;const $v2623=($v2622&&$v2622.$==="MTip");if($v2623){const $v2624=($v3&&$v3.$==="Tuple");if($v2624){const $v2625=$v3.fst;const $v2627=$v3.snd;const $v2628=$p_is_true($v2627);if($v2628){const $v2629=({$:"MTip"});const $v2630=({$:"MNode","pos":$v2618,"lo":$v2620,"hi":$v2629});const $v2631=({$:"None"});const $v2632=({$:"Tuple","fst":$v2625,"snd":$v2631});const $v2633=({$:"Tuple","fst":$v2630,"snd":$v2632});return $v2633;}else{break $case2616;}}else{break $case2616;}}else{break $case2616;}}else{break $case2616;}}$case2634:{const $v2635=($v2&&$v2.$==="MNode");if($v2635){const $v2636=$v2.pos;const $v2638=$v2.lo;const $v2640=$v2.hi;const $v2641=($v2640&&$v2640.$==="MLeaf");if($v2641){const $v2642=$v2640.key;const $v2644=$v2640.val;const $v2646=($v3&&$v3.$==="Tuple");if($v2646){const $v2647=$v3.fst;const $v2649=$v3.snd;const $v2650=$p_is_true($v2649);if($v2650){const $v2651=({$:"MLeaf","key":$v2642,"val":$v2644});const $v2652=({$:"MNode","pos":$v2636,"lo":$v2638,"hi":$v2651});const $v2653=({$:"Some","value":$v2642});const $v2654=({$:"Tuple","fst":$v2647,"snd":$v2653});const $v2655=({$:"Tuple","fst":$v2652,"snd":$v2654});return $v2655;}else{break $case2634;}}else{break $case2634;}}else{break $case2634;}}else{break $case2634;}}$case2656:{const $v2657=($v2&&$v2.$==="MNode");if($v2657){const $v2658=$v2.pos;const $v2660=$v2.lo;const $v2662=$v2.hi;const $v2663=($v2662&&$v2662.$==="MNode");if($v2663){const $v2664=$v2662.pos;const $v2666=$v2662.lo;const $v2668=$v2662.hi;const $v2670=($v3&&$v3.$==="Tuple");if($v2670){const $v2671=$v3.fst;const $v2673=$v3.snd;const $v2674=$p_is_true($v2673);if($v2674){const $v2675=({$:"MNode","pos":$v2664,"lo":$v2666,"hi":$v2668});const $v2676=$p_map_bit($v2671,$v2664);{const $a0=$v2675,$a1=$v2676;$stArgs[$sp++]=$v2658;$stArgs[$sp++]=$v2660;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2677,$kb);try{return $split_done($b385($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b385,2,$k2677,$sp-2);}}else{break $case2656;}}else{break $case2656;}}else{break $case2656;}}else{break $case2656;}}$case2679:{const $v2681=($v3&&$v3.$==="Tuple");if($v2681){const $v2682=$v3.fst;const $v2684=$v3.snd;const $v2686=({$:"None"});const $v2687=({$:"Tuple","fst":$v2682,"snd":$v2686});const $v2688=({$:"Tuple","fst":$v2,"snd":$v2687});return $v2688;}else{break $case2679;}}throw "bend: runtime fail-stop";}
function $k2614($v2614,$base,$td=0){const $v2595=$stArgs[$base+0];const $v2605=$stArgs[$base+1];return ($td<64?$b383($v2595,$v2605,$v2614,$td+1):run_named3($b383,$v2595,$v2605,$v2614,$td));}
function $k2677($v2677,$base,$td=0){const $v2658=$stArgs[$base+0];const $v2660=$stArgs[$base+1];return ($td<64?$b384($v2658,$v2660,$v2677,$td+1):run_named3($b384,$v2658,$v2660,$v2677,$td));}
function $b386($v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case2689:{const $v2690=true;const $v2691=({$:"MTip"});const $v2692=({$:"None"});const $v2693=({$:"Tuple","fst":$v3,"snd":$v2692});const $v2694=({$:"Tuple","fst":$v2691,"snd":$v2693});return $v2694;}break;}case "MLeaf":{$case2695:{const $v2696=true;const $v2697=$v2.key;const $v2699=$v2.val;const $v2701=({$:"MLeaf","key":$v2697,"val":$v2699});const $v2702=({$:"Some","value":$v2697});const $v2703=({$:"Tuple","fst":$v3,"snd":$v2702});const $v2704=({$:"Tuple","fst":$v2701,"snd":$v2703});return $v2704;}break;}case "MNode":{$case2705:{const $v2706=true;const $v2707=$v2.pos;const $v2709=$v2.lo;const $v2711=$v2.hi;const $v2713=({$:"MNode","pos":$v2707,"lo":$v2709,"hi":$v2711});const $v2714=$p_map_bit($v3,$v2707);return ($td<64?$b385($v2713,$v2714,$td+1):run_named2($b385,$v2713,$v2714,$td));}break;}}throw "bend: runtime fail-stop";}
function $b477($c0,$c1,$c2,$c3,$c4,$v2726,$td=0){$case2727:{const $v2728=($v2726&&$v2726.$==="EQ");if($v2728){return ($td<64?$b378($c0,$c1,$c2,$td+1):run_named3($b378,$c0,$c1,$c2,$td));}else{break $case2727;}}$case2730:{{const $a0=$c3,$a1=$c4;$stArgs[$sp++]=$c0;$stArgs[$sp++]=$c1;$stArgs[$sp++]=$c2;if($td<64){const $kb=$sp-3,$ki=$split_enter($k2732,$kb);try{return $split_done($b375($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b375,2,$k2732,$sp-3);}}throw "bend: runtime fail-stop";}
function $k2732($v2732,$base,$td=0){const $c0=$stArgs[$base+0];const $c1=$stArgs[$base+1];const $c2=$stArgs[$base+2];return ($td<64?$b382($c0,$c1,$c2,$v2732,$td+1):run_named4($b382,$c0,$c1,$c2,$v2732,$td));}
function $b387($v2,$v3,$v4,$v5,$td=0){$case2716:{const $v2717=($v5&&$v5.$==="Tuple");if($v2717){const $v2718=$v5.fst;const $v2719=($v2718&&$v2718.$==="Tuple");if($v2719){const $v2720=$v2718.fst;const $v2722=$v2718.snd;const $v2724=$v5.snd;return ($td<64?$b477($v2,$v3,$v4,$v2720,$v2722,$v2724,$td+1):run_named6($b477,$v2,$v3,$v4,$v2720,$v2722,$v2724,$td));}else{break $case2716;}}else{break $case2716;}}throw "bend: runtime fail-stop";}
function $b388($v2,$v3,$v4,$v5,$v6,$td=0){const $v2735=$p_string_cmp($v5,$v6);return ($td<64?$b387($v2,$v3,$v4,$v2735,$td+1):run_named4($b387,$v2,$v3,$v4,$v2735,$td));}
function $b478($c0,$c1,$c2,$v2747,$td=0){$case2748:{const $v2749=($v2747&&$v2747.$==="None");if($v2749){const $v2750=({$:"MLeaf","key":$c0,"val":$c1});return $v2750;}else{break $case2748;}}$case2751:{const $v2752=($v2747&&$v2747.$==="Some");if($v2752){const $v2753=$v2747.value;return ($td<64?$b388($c2,$c0,$c1,$c0,$v2753,$td+1):run_named5($b388,$c2,$c0,$c1,$c0,$v2753,$td));}else{break $case2751;}}throw "bend: runtime fail-stop";}
function $b389($v2,$v3,$td=0){$case2737:{const $v2738=($v3&&$v3.$==="Tuple");if($v2738){const $v2739=$v3.fst;const $v2741=$v3.snd;const $v2742=($v2741&&$v2741.$==="Tuple");if($v2742){const $v2743=$v2741.fst;const $v2745=$v2741.snd;return ($td<64?$b478($v2743,$v2,$v2739,$v2745,$td+1):run_named4($b478,$v2743,$v2,$v2739,$v2745,$td));}else{break $case2737;}}else{break $case2737;}}throw "bend: runtime fail-stop";}
function $b390($v2,$v3,$v4,$td=0){{const $a0=$v2,$a1=$v3;$stArgs[$sp++]=$v4;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2758,$kb);try{return $split_done($b386($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b386,2,$k2758,$sp-1);}}
function $k2758($v2758,$base,$td=0){const $v4=$stArgs[$base+0];return ($td<64?$b389($v4,$v2758,$td+1):run_named2($b389,$v4,$v2758,$td));}
function $b391($v2,$v3,$td=0){$case2760:{const $v2761=($v3&&$v3.$==="Tuple");if($v2761){const $v2762=$v3.fst;const $v2763=($v2762&&$v2762.$==="Tuple");if($v2763){const $v2764=$v2762.fst;const $v2766=$v2762.snd;const $v2768=$v3.snd;const $v2770=({$:"MLeaf","key":$v2766,"val":$v2});{const $a0=$v2768;$stArgs[$sp++]=$v2770;if($td<64){const $kb=$sp-1,$ki=$split_enter($k2771,$kb);try{return $split_done($b89($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b89,1,$k2771,$sp-1);}}else{break $case2760;}}else{break $case2760;}}throw "bend: runtime fail-stop";}
function $k2771($v2771,$base,$td=0){const $v2770=$stArgs[$base+0];const $v2772=({$:"Tuple","fst":$v2770,"snd":$v2771});return $v2772;}
function $b392($v2,$v3,$td=0){$case2773:{const $v2774=($v2&&$v2.$==="MNode");if($v2774){const $v2775=$v2.pos;const $v2777=$v2.lo;const $v2778=($v2777&&$v2777.$==="MTip");if($v2778){const $v2779=$v2.hi;const $v2781=($v3&&$v3.$==="Tuple");if($v2781){const $v2782=$v3.fst;const $v2784=$v3.snd;const $v2785=$p_is_false($v2784);if($v2785){const $v2786=({$:"MTip"});const $v2787=({$:"MNode","pos":$v2775,"lo":$v2786,"hi":$v2779});const $v2788=({$:"Tuple","fst":$v2787,"snd":false});return $v2788;}else{break $case2773;}}else{break $case2773;}}else{break $case2773;}}else{break $case2773;}}$case2789:{const $v2790=($v2&&$v2.$==="MNode");if($v2790){const $v2791=$v2.pos;const $v2793=$v2.lo;const $v2794=($v2793&&$v2793.$==="MLeaf");if($v2794){const $v2795=$v2793.key;const $v2797=$v2793.val;const $v2799=$v2.hi;const $v2801=($v3&&$v3.$==="Tuple");if($v2801){const $v2802=$v3.fst;const $v2804=$v3.snd;const $v2805=$p_is_false($v2804);if($v2805){const $v2806=$p_string_cmp($v2802,$v2795);{const $a0=$v2797,$a1=$v2806;$stArgs[$sp++]=$v2791;$stArgs[$sp++]=$v2799;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2807,$kb);try{return $split_done($b391($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b391,2,$k2807,$sp-2);}}else{break $case2789;}}else{break $case2789;}}else{break $case2789;}}else{break $case2789;}}$case2809:{const $v2810=($v2&&$v2.$==="MNode");if($v2810){const $v2811=$v2.pos;const $v2813=$v2.lo;const $v2814=($v2813&&$v2813.$==="MNode");if($v2814){const $v2815=$v2813.pos;const $v2817=$v2813.lo;const $v2819=$v2813.hi;const $v2821=$v2.hi;const $v2823=($v3&&$v3.$==="Tuple");if($v2823){const $v2824=$v3.fst;const $v2826=$v3.snd;const $v2827=$p_is_false($v2826);if($v2827){const $v2828=({$:"MNode","pos":$v2815,"lo":$v2817,"hi":$v2819});const $v2829=$p_map_bit($v2824,$v2815);{const $a0=$v2828,$a1=$v2829;$stArgs[$sp++]=$v2811;$stArgs[$sp++]=$v2821;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2830,$kb);try{return $split_done($b392($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b392,2,$k2830,$sp-2);}}else{break $case2809;}}else{break $case2809;}}else{break $case2809;}}else{break $case2809;}}$case2832:{const $v2833=($v2&&$v2.$==="MNode");if($v2833){const $v2834=$v2.pos;const $v2836=$v2.lo;const $v2838=$v2.hi;const $v2839=($v2838&&$v2838.$==="MTip");if($v2839){const $v2840=($v3&&$v3.$==="Tuple");if($v2840){const $v2841=$v3.fst;const $v2843=$v3.snd;const $v2844=$p_is_true($v2843);if($v2844){const $v2845=({$:"MTip"});const $v2846=({$:"MNode","pos":$v2834,"lo":$v2836,"hi":$v2845});const $v2847=({$:"Tuple","fst":$v2846,"snd":false});return $v2847;}else{break $case2832;}}else{break $case2832;}}else{break $case2832;}}else{break $case2832;}}$case2848:{const $v2849=($v2&&$v2.$==="MNode");if($v2849){const $v2850=$v2.pos;const $v2852=$v2.lo;const $v2854=$v2.hi;const $v2855=($v2854&&$v2854.$==="MLeaf");if($v2855){const $v2856=$v2854.key;const $v2858=$v2854.val;const $v2860=($v3&&$v3.$==="Tuple");if($v2860){const $v2861=$v3.fst;const $v2863=$v3.snd;const $v2864=$p_is_true($v2863);if($v2864){const $v2865=$p_string_cmp($v2861,$v2856);{const $a0=$v2858,$a1=$v2865;$stArgs[$sp++]=$v2850;$stArgs[$sp++]=$v2852;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2866,$kb);try{return $split_done($b391($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b391,2,$k2866,$sp-2);}}else{break $case2848;}}else{break $case2848;}}else{break $case2848;}}else{break $case2848;}}$case2868:{const $v2869=($v2&&$v2.$==="MNode");if($v2869){const $v2870=$v2.pos;const $v2872=$v2.lo;const $v2874=$v2.hi;const $v2875=($v2874&&$v2874.$==="MNode");if($v2875){const $v2876=$v2874.pos;const $v2878=$v2874.lo;const $v2880=$v2874.hi;const $v2882=($v3&&$v3.$==="Tuple");if($v2882){const $v2883=$v3.fst;const $v2885=$v3.snd;const $v2886=$p_is_true($v2885);if($v2886){const $v2887=({$:"MNode","pos":$v2876,"lo":$v2878,"hi":$v2880});const $v2888=$p_map_bit($v2883,$v2876);{const $a0=$v2887,$a1=$v2888;$stArgs[$sp++]=$v2870;$stArgs[$sp++]=$v2872;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2889,$kb);try{return $split_done($b392($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b392,2,$k2889,$sp-2);}}else{break $case2868;}}else{break $case2868;}}else{break $case2868;}}else{break $case2868;}}$case2891:{const $v2894=({$:"Tuple","fst":$v2,"snd":false});return $v2894;}throw "bend: runtime fail-stop";}
function $k2807($v2807,$base,$td=0){const $v2791=$stArgs[$base+0];const $v2799=$stArgs[$base+1];return ($td<64?$b383($v2791,$v2799,$v2807,$td+1):run_named3($b383,$v2791,$v2799,$v2807,$td));}
function $k2830($v2830,$base,$td=0){const $v2811=$stArgs[$base+0];const $v2821=$stArgs[$base+1];return ($td<64?$b383($v2811,$v2821,$v2830,$td+1):run_named3($b383,$v2811,$v2821,$v2830,$td));}
function $k2866($v2866,$base,$td=0){const $v2850=$stArgs[$base+0];const $v2852=$stArgs[$base+1];return ($td<64?$b384($v2850,$v2852,$v2866,$td+1):run_named3($b384,$v2850,$v2852,$v2866,$td));}
function $k2889($v2889,$base,$td=0){const $v2870=$stArgs[$base+0];const $v2872=$stArgs[$base+1];return ($td<64?$b384($v2870,$v2872,$v2889,$td+1):run_named3($b384,$v2870,$v2872,$v2889,$td));}
function $b393($v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case2895:{const $v2896=true;const $v2897=({$:"MTip"});const $v2898=({$:"Tuple","fst":$v2897,"snd":false});return $v2898;}break;}case "MLeaf":{$case2899:{const $v2900=true;const $v2901=$v2.key;const $v2903=$v2.val;const $v2905=$p_string_cmp($v3,$v2901);return ($td<64?$b391($v2903,$v2905,$td+1):run_named2($b391,$v2903,$v2905,$td));}break;}case "MNode":{$case2907:{const $v2908=true;const $v2909=$v2.pos;const $v2911=$v2.lo;const $v2913=$v2.hi;const $v2915=({$:"MNode","pos":$v2909,"lo":$v2911,"hi":$v2913});const $v2916=$p_map_bit($v3,$v2909);return ($td<64?$b392($v2915,$v2916,$td+1):run_named2($b392,$v2915,$v2916,$td));}break;}}throw "bend: runtime fail-stop";}
function $b479($c0,$c1,$c2,$v2928,$td=0){$case2929:{const $v2930=($v2928&&$v2928.$==="EQ");if($v2930){const $v2931=({$:"MLeaf","key":$c0,"val":$c1});const $v2932=({$:"Tuple","fst":$v2931,"snd":$c1});return $v2932;}else{break $case2929;}}$case2933:{const $v2935=({$:"MLeaf","key":$c0,"val":$c1});const $v2936=({$:"Tuple","fst":$v2935,"snd":$c2});return $v2936;}throw "bend: runtime fail-stop";}
function $b394($v1,$v2,$v3,$td=0){$case2918:{const $v2919=($v3&&$v3.$==="Tuple");if($v2919){const $v2920=$v3.fst;const $v2921=($v2920&&$v2920.$==="Tuple");if($v2921){const $v2922=$v2920.fst;const $v2924=$v2920.snd;const $v2926=$v3.snd;return ($td<64?$b479($v2924,$v2,$v1,$v2926,$td+1):run_named4($b479,$v2924,$v2,$v1,$v2926,$td));}else{break $case2918;}}else{break $case2918;}}throw "bend: runtime fail-stop";}
function $b395($v1,$v2,$v3,$td=0){$case2938:{const $v2939=($v1&&$v1.$==="MNode");if($v2939){const $v2940=$v1.pos;const $v2942=$v1.lo;const $v2943=($v2942&&$v2942.$==="MTip");if($v2943){const $v2944=$v1.hi;const $v2946=($v3&&$v3.$==="Tuple");if($v2946){const $v2947=$v3.fst;const $v2949=$v3.snd;const $v2950=$p_is_false($v2949);if($v2950){const $v2951=({$:"MTip"});const $v2952=({$:"MNode","pos":$v2940,"lo":$v2951,"hi":$v2944});const $v2953=({$:"Tuple","fst":$v2952,"snd":$v2});return $v2953;}else{break $case2938;}}else{break $case2938;}}else{break $case2938;}}else{break $case2938;}}$case2954:{const $v2955=($v1&&$v1.$==="MNode");if($v2955){const $v2956=$v1.pos;const $v2958=$v1.lo;const $v2959=($v2958&&$v2958.$==="MLeaf");if($v2959){const $v2960=$v2958.key;const $v2962=$v2958.val;const $v2964=$v1.hi;const $v2966=($v3&&$v3.$==="Tuple");if($v2966){const $v2967=$v3.fst;const $v2969=$v3.snd;const $v2970=$p_is_false($v2969);if($v2970){const $v2971=$p_string_cmp($v2967,$v2960);{const $a0=$v2,$a1=$v2962,$a2=$v2971;$stArgs[$sp++]=$v2956;$stArgs[$sp++]=$v2964;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2972,$kb);try{return $split_done($b394($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b394,3,$k2972,$sp-2);}}else{break $case2954;}}else{break $case2954;}}else{break $case2954;}}else{break $case2954;}}$case2974:{const $v2975=($v1&&$v1.$==="MNode");if($v2975){const $v2976=$v1.pos;const $v2978=$v1.lo;const $v2979=($v2978&&$v2978.$==="MNode");if($v2979){const $v2980=$v2978.pos;const $v2982=$v2978.lo;const $v2984=$v2978.hi;const $v2986=$v1.hi;const $v2988=($v3&&$v3.$==="Tuple");if($v2988){const $v2989=$v3.fst;const $v2991=$v3.snd;const $v2992=$p_is_false($v2991);if($v2992){const $v2993=({$:"MNode","pos":$v2980,"lo":$v2982,"hi":$v2984});const $v2994=$p_map_bit($v2989,$v2980);{const $a0=$v2993,$a1=$v2,$a2=$v2994;$stArgs[$sp++]=$v2976;$stArgs[$sp++]=$v2986;if($td<64){const $kb=$sp-2,$ki=$split_enter($k2995,$kb);try{return $split_done($b395($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b395,3,$k2995,$sp-2);}}else{break $case2974;}}else{break $case2974;}}else{break $case2974;}}else{break $case2974;}}$case2997:{const $v2998=($v1&&$v1.$==="MNode");if($v2998){const $v2999=$v1.pos;const $v3001=$v1.lo;const $v3003=$v1.hi;const $v3004=($v3003&&$v3003.$==="MTip");if($v3004){const $v3005=($v3&&$v3.$==="Tuple");if($v3005){const $v3006=$v3.fst;const $v3008=$v3.snd;const $v3009=$p_is_true($v3008);if($v3009){const $v3010=({$:"MTip"});const $v3011=({$:"MNode","pos":$v2999,"lo":$v3001,"hi":$v3010});const $v3012=({$:"Tuple","fst":$v3011,"snd":$v2});return $v3012;}else{break $case2997;}}else{break $case2997;}}else{break $case2997;}}else{break $case2997;}}$case3013:{const $v3014=($v1&&$v1.$==="MNode");if($v3014){const $v3015=$v1.pos;const $v3017=$v1.lo;const $v3019=$v1.hi;const $v3020=($v3019&&$v3019.$==="MLeaf");if($v3020){const $v3021=$v3019.key;const $v3023=$v3019.val;const $v3025=($v3&&$v3.$==="Tuple");if($v3025){const $v3026=$v3.fst;const $v3028=$v3.snd;const $v3029=$p_is_true($v3028);if($v3029){const $v3030=$p_string_cmp($v3026,$v3021);{const $a0=$v2,$a1=$v3023,$a2=$v3030;$stArgs[$sp++]=$v3015;$stArgs[$sp++]=$v3017;if($td<64){const $kb=$sp-2,$ki=$split_enter($k3031,$kb);try{return $split_done($b394($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b394,3,$k3031,$sp-2);}}else{break $case3013;}}else{break $case3013;}}else{break $case3013;}}else{break $case3013;}}$case3033:{const $v3034=($v1&&$v1.$==="MNode");if($v3034){const $v3035=$v1.pos;const $v3037=$v1.lo;const $v3039=$v1.hi;const $v3040=($v3039&&$v3039.$==="MNode");if($v3040){const $v3041=$v3039.pos;const $v3043=$v3039.lo;const $v3045=$v3039.hi;const $v3047=($v3&&$v3.$==="Tuple");if($v3047){const $v3048=$v3.fst;const $v3050=$v3.snd;const $v3051=$p_is_true($v3050);if($v3051){const $v3052=({$:"MNode","pos":$v3041,"lo":$v3043,"hi":$v3045});const $v3053=$p_map_bit($v3048,$v3041);{const $a0=$v3052,$a1=$v2,$a2=$v3053;$stArgs[$sp++]=$v3035;$stArgs[$sp++]=$v3037;if($td<64){const $kb=$sp-2,$ki=$split_enter($k3054,$kb);try{return $split_done($b395($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b395,3,$k3054,$sp-2);}}else{break $case3033;}}else{break $case3033;}}else{break $case3033;}}else{break $case3033;}}$case3056:{const $v3059=({$:"Tuple","fst":$v1,"snd":$v2});return $v3059;}throw "bend: runtime fail-stop";}
function $k2972($v2972,$base,$td=0){const $v2956=$stArgs[$base+0];const $v2964=$stArgs[$base+1];return ($td<64?$b383($v2956,$v2964,$v2972,$td+1):run_named3($b383,$v2956,$v2964,$v2972,$td));}
function $k2995($v2995,$base,$td=0){const $v2976=$stArgs[$base+0];const $v2986=$stArgs[$base+1];return ($td<64?$b383($v2976,$v2986,$v2995,$td+1):run_named3($b383,$v2976,$v2986,$v2995,$td));}
function $k3031($v3031,$base,$td=0){const $v3015=$stArgs[$base+0];const $v3017=$stArgs[$base+1];return ($td<64?$b384($v3015,$v3017,$v3031,$td+1):run_named3($b384,$v3015,$v3017,$v3031,$td));}
function $k3054($v3054,$base,$td=0){const $v3035=$stArgs[$base+0];const $v3037=$stArgs[$base+1];return ($td<64?$b384($v3035,$v3037,$v3054,$td+1):run_named3($b384,$v3035,$v3037,$v3054,$td));}
function $b396($v1,$v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case3060:{const $v3061=true;const $v3062=({$:"MTip"});const $v3063=({$:"Tuple","fst":$v3062,"snd":$v1});return $v3063;}break;}case "MLeaf":{$case3064:{const $v3065=true;const $v3066=$v2.key;const $v3068=$v2.val;const $v3070=$p_string_cmp($v3,$v3066);return ($td<64?$b394($v1,$v3068,$v3070,$td+1):run_named3($b394,$v1,$v3068,$v3070,$td));}break;}case "MNode":{$case3072:{const $v3073=true;const $v3074=$v2.pos;const $v3076=$v2.lo;const $v3078=$v2.hi;const $v3080=({$:"MNode","pos":$v3074,"lo":$v3076,"hi":$v3078});const $v3081=$p_map_bit($v3,$v3074);return ($td<64?$b395($v3080,$v1,$v3081,$td+1):run_named3($b395,$v3080,$v1,$v3081,$td));}break;}}throw "bend: runtime fail-stop";}
function $b397($v1,$v2,$td=0){$case3083:{const $v3084=$p_is_true($v2);if($v3084){const $v3085=({$:"Some","value":$v1});return $v3085;}else{break $case3083;}}$case3086:{const $v3087=$p_is_false($v2);if($v3087){const $v3088=({$:"None"});return $v3088;}else{break $case3086;}}throw "bend: runtime fail-stop";}
function $b398($v1,$v2,$v3,$td=0){$case3089:{const $v3090=($v3&&$v3.$==="Tuple");if($v3090){const $v3091=$v3.fst;const $v3093=$v3.snd;const $v3094=$p_is_false($v3093);if($v3094){const $v3095=$p_map_find($v1,$v3091);return $v3095;}else{break $case3089;}}else{break $case3089;}}$case3096:{const $v3097=($v3&&$v3.$==="Tuple");if($v3097){const $v3098=$v3.fst;const $v3100=$v3.snd;const $v3101=$p_is_true($v3100);if($v3101){const $v3102=$p_map_find($v2,$v3098);return $v3102;}else{break $case3096;}}else{break $case3096;}}throw "bend: runtime fail-stop";}
function $b480($c0,$c1,$c2,$v3109,$td=0){$case3110:{const $v3111=($v3109&&$v3109.$==="MTip");if($v3111){const $v3112=({$:"Tuple","fst":$c0,"snd":$c1});return $v3112;}else{break $case3110;}}$case3113:{const $v3115=({$:"MNode","pos":$c2,"lo":$v3109,"hi":$c0});const $v3116=({$:"Tuple","fst":$v3115,"snd":$c1});return $v3116;}throw "bend: runtime fail-stop";}
function $b400($v2,$v3,$v4,$td=0){$case3103:{const $v3104=($v4&&$v4.$==="Tuple");if($v3104){const $v3105=$v4.fst;const $v3107=$v4.snd;return ($td<64?$b480($v3,$v3107,$v2,$v3105,$td+1):run_named4($b480,$v3,$v3107,$v2,$v3105,$td));}else{break $case3103;}}throw "bend: runtime fail-stop";}
function $b481($c0,$c1,$c2,$v3124,$td=0){$case3125:{const $v3126=($v3124&&$v3124.$==="MTip");if($v3126){const $v3127=({$:"Tuple","fst":$c0,"snd":$c1});return $v3127;}else{break $case3125;}}$case3128:{const $v3130=({$:"MNode","pos":$c2,"lo":$c0,"hi":$v3124});const $v3131=({$:"Tuple","fst":$v3130,"snd":$c1});return $v3131;}throw "bend: runtime fail-stop";}
function $b401($v2,$v3,$v4,$td=0){$case3118:{const $v3119=($v4&&$v4.$==="Tuple");if($v3119){const $v3120=$v4.fst;const $v3122=$v4.snd;return ($td<64?$b481($v3,$v3122,$v2,$v3120,$td+1):run_named4($b481,$v3,$v3122,$v2,$v3120,$td));}else{break $case3118;}}throw "bend: runtime fail-stop";}
function $b482($c0,$c1,$v3143,$td=0){$case3144:{const $v3145=($v3143&&$v3143.$==="EQ");if($v3145){const $v3146=({$:"MTip"});const $v3147=({$:"Some","value":$c0});const $v3148=({$:"Tuple","fst":$v3146,"snd":$v3147});return $v3148;}else{break $case3144;}}$case3149:{const $v3151=({$:"MLeaf","key":$c1,"val":$c0});const $v3152=({$:"None"});const $v3153=({$:"Tuple","fst":$v3151,"snd":$v3152});return $v3153;}throw "bend: runtime fail-stop";}
function $b402($v2,$v3,$td=0){$case3133:{const $v3134=($v3&&$v3.$==="Tuple");if($v3134){const $v3135=$v3.fst;const $v3136=($v3135&&$v3135.$==="Tuple");if($v3136){const $v3137=$v3135.fst;const $v3139=$v3135.snd;const $v3141=$v3.snd;return ($td<64?$b482($v2,$v3139,$v3141,$td+1):run_named3($b482,$v2,$v3139,$v3141,$td));}else{break $case3133;}}else{break $case3133;}}throw "bend: runtime fail-stop";}
function $b403($v2,$v3,$td=0){$case3155:{const $v3156=($v2&&$v2.$==="MNode");if($v3156){const $v3157=$v2.pos;const $v3159=$v2.lo;const $v3160=($v3159&&$v3159.$==="MTip");if($v3160){const $v3161=$v2.hi;const $v3163=($v3&&$v3.$==="Tuple");if($v3163){const $v3164=$v3.fst;const $v3166=$v3.snd;const $v3167=$p_is_false($v3166);if($v3167){const $v3168=({$:"None"});const $v3169=({$:"Tuple","fst":$v3161,"snd":$v3168});return $v3169;}else{break $case3155;}}else{break $case3155;}}else{break $case3155;}}else{break $case3155;}}$case3170:{const $v3171=($v2&&$v2.$==="MNode");if($v3171){const $v3172=$v2.pos;const $v3174=$v2.lo;const $v3175=($v3174&&$v3174.$==="MLeaf");if($v3175){const $v3176=$v3174.key;const $v3178=$v3174.val;const $v3180=$v2.hi;const $v3182=($v3&&$v3.$==="Tuple");if($v3182){const $v3183=$v3.fst;const $v3185=$v3.snd;const $v3186=$p_is_false($v3185);if($v3186){const $v3187=$p_string_cmp($v3183,$v3176);{const $a0=$v3178,$a1=$v3187;$stArgs[$sp++]=$v3172;$stArgs[$sp++]=$v3180;if($td<64){const $kb=$sp-2,$ki=$split_enter($k3188,$kb);try{return $split_done($b402($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b402,2,$k3188,$sp-2);}}else{break $case3170;}}else{break $case3170;}}else{break $case3170;}}else{break $case3170;}}$case3190:{const $v3191=($v2&&$v2.$==="MNode");if($v3191){const $v3192=$v2.pos;const $v3194=$v2.lo;const $v3195=($v3194&&$v3194.$==="MNode");if($v3195){const $v3196=$v3194.pos;const $v3198=$v3194.lo;const $v3200=$v3194.hi;const $v3202=$v2.hi;const $v3204=($v3&&$v3.$==="Tuple");if($v3204){const $v3205=$v3.fst;const $v3207=$v3.snd;const $v3208=$p_is_false($v3207);if($v3208){const $v3209=({$:"MNode","pos":$v3196,"lo":$v3198,"hi":$v3200});const $v3210=$p_map_bit($v3205,$v3196);{const $a0=$v3209,$a1=$v3210;$stArgs[$sp++]=$v3192;$stArgs[$sp++]=$v3202;if($td<64){const $kb=$sp-2,$ki=$split_enter($k3211,$kb);try{return $split_done($b403($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b403,2,$k3211,$sp-2);}}else{break $case3190;}}else{break $case3190;}}else{break $case3190;}}else{break $case3190;}}$case3213:{const $v3214=($v2&&$v2.$==="MNode");if($v3214){const $v3215=$v2.pos;const $v3217=$v2.lo;const $v3219=$v2.hi;const $v3220=($v3219&&$v3219.$==="MTip");if($v3220){const $v3221=($v3&&$v3.$==="Tuple");if($v3221){const $v3222=$v3.fst;const $v3224=$v3.snd;const $v3225=$p_is_true($v3224);if($v3225){const $v3226=({$:"None"});const $v3227=({$:"Tuple","fst":$v3217,"snd":$v3226});return $v3227;}else{break $case3213;}}else{break $case3213;}}else{break $case3213;}}else{break $case3213;}}$case3228:{const $v3229=($v2&&$v2.$==="MNode");if($v3229){const $v3230=$v2.pos;const $v3232=$v2.lo;const $v3234=$v2.hi;const $v3235=($v3234&&$v3234.$==="MLeaf");if($v3235){const $v3236=$v3234.key;const $v3238=$v3234.val;const $v3240=($v3&&$v3.$==="Tuple");if($v3240){const $v3241=$v3.fst;const $v3243=$v3.snd;const $v3244=$p_is_true($v3243);if($v3244){const $v3245=$p_string_cmp($v3241,$v3236);{const $a0=$v3238,$a1=$v3245;$stArgs[$sp++]=$v3230;$stArgs[$sp++]=$v3232;if($td<64){const $kb=$sp-2,$ki=$split_enter($k3246,$kb);try{return $split_done($b402($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b402,2,$k3246,$sp-2);}}else{break $case3228;}}else{break $case3228;}}else{break $case3228;}}else{break $case3228;}}$case3248:{const $v3249=($v2&&$v2.$==="MNode");if($v3249){const $v3250=$v2.pos;const $v3252=$v2.lo;const $v3254=$v2.hi;const $v3255=($v3254&&$v3254.$==="MNode");if($v3255){const $v3256=$v3254.pos;const $v3258=$v3254.lo;const $v3260=$v3254.hi;const $v3262=($v3&&$v3.$==="Tuple");if($v3262){const $v3263=$v3.fst;const $v3265=$v3.snd;const $v3266=$p_is_true($v3265);if($v3266){const $v3267=({$:"MNode","pos":$v3256,"lo":$v3258,"hi":$v3260});const $v3268=$p_map_bit($v3263,$v3256);{const $a0=$v3267,$a1=$v3268;$stArgs[$sp++]=$v3250;$stArgs[$sp++]=$v3252;if($td<64){const $kb=$sp-2,$ki=$split_enter($k3269,$kb);try{return $split_done($b403($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b403,2,$k3269,$sp-2);}}else{break $case3248;}}else{break $case3248;}}else{break $case3248;}}else{break $case3248;}}$case3271:{const $v3274=({$:"None"});const $v3275=({$:"Tuple","fst":$v2,"snd":$v3274});return $v3275;}throw "bend: runtime fail-stop";}
function $k3188($v3188,$base,$td=0){const $v3172=$stArgs[$base+0];const $v3180=$stArgs[$base+1];return ($td<64?$b400($v3172,$v3180,$v3188,$td+1):run_named3($b400,$v3172,$v3180,$v3188,$td));}
function $k3211($v3211,$base,$td=0){const $v3192=$stArgs[$base+0];const $v3202=$stArgs[$base+1];return ($td<64?$b400($v3192,$v3202,$v3211,$td+1):run_named3($b400,$v3192,$v3202,$v3211,$td));}
function $k3246($v3246,$base,$td=0){const $v3230=$stArgs[$base+0];const $v3232=$stArgs[$base+1];return ($td<64?$b401($v3230,$v3232,$v3246,$td+1):run_named3($b401,$v3230,$v3232,$v3246,$td));}
function $k3269($v3269,$base,$td=0){const $v3250=$stArgs[$base+0];const $v3252=$stArgs[$base+1];return ($td<64?$b401($v3250,$v3252,$v3269,$td+1):run_named3($b401,$v3250,$v3252,$v3269,$td));}
function $b404($v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case3276:{const $v3277=true;const $v3278=({$:"MTip"});const $v3279=({$:"None"});const $v3280=({$:"Tuple","fst":$v3278,"snd":$v3279});return $v3280;}break;}case "MLeaf":{$case3281:{const $v3282=true;const $v3283=$v2.key;const $v3285=$v2.val;const $v3287=$p_string_cmp($v3,$v3283);return ($td<64?$b402($v3285,$v3287,$td+1):run_named2($b402,$v3285,$v3287,$td));}break;}case "MNode":{$case3289:{const $v3290=true;const $v3291=$v2.pos;const $v3293=$v2.lo;const $v3295=$v2.hi;const $v3297=({$:"MNode","pos":$v3291,"lo":$v3293,"hi":$v3295});const $v3298=$p_map_bit($v3,$v3291);return ($td<64?$b403($v3297,$v3298,$td+1):run_named2($b403,$v3297,$v3298,$td));}break;}}throw "bend: runtime fail-stop";}
function $b405($v2,$td=0){$case3300:{const $v3301=($v2&&$v2.$==="Tuple");if($v3301){const $v3302=$v2.fst;const $v3304=$v2.snd;return $v3302;}else{break $case3300;}}throw "bend: runtime fail-stop";}
function $b406($v2,$v3,$td=0){{const $a0=$v2,$a1=$v3;if($td<64){const $kb=$sp-0,$ki=$split_enter($k3306,$kb);try{return $split_done($b404($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b404,2,$k3306,$sp-0);}}
function $k3306($v3306,$base,$td=0){return ($td<64?$b405($v3306,$td+1):run_named1($b405,$v3306,$td));}
function $b407($v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case3308:{const $v3309=true;return $v3;}break;}case "MLeaf":{$case3310:{const $v3311=true;const $v3312=$v2.key;const $v3314=$v2.val;const $v3316=({$:"Tuple","fst":$v3312,"snd":$v3314});const $v3317=({$:"Con","head":$v3316,"tail":$v3});return $v3317;}break;}case "MNode":{$case3318:{const $v3319=true;const $v3320=$v2.pos;const $v3322=$v2.lo;const $v3324=$v2.hi;{const $a0=$v3324,$a1=$v3;$stArgs[$sp++]=$v3322;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3326,$kb);try{return $split_done($b407($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b407,2,$k3326,$sp-1);}}break;}}throw "bend: runtime fail-stop";}
function $k3326($v3326,$base,$td=0){const $v3322=$stArgs[$base+0];return ($td<64?$b407($v3322,$v3326,$td+1):run_named2($b407,$v3322,$v3326,$td));}
function $b408($v2,$td=0){const $v3328=({$:"Nil"});return ($td<64?$b407($v2,$v3328,$td+1):run_named2($b407,$v2,$v3328,$td));}
function $b409($v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case3330:{const $v3331=true;return $v3;}break;}case "MLeaf":{$case3332:{const $v3333=true;const $v3334=$v2.key;const $v3336=$v2.val;const $v3338=({$:"Con","head":$v3334,"tail":$v3});return $v3338;}break;}case "MNode":{$case3339:{const $v3340=true;const $v3341=$v2.pos;const $v3343=$v2.lo;const $v3345=$v2.hi;{const $a0=$v3345,$a1=$v3;$stArgs[$sp++]=$v3343;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3347,$kb);try{return $split_done($b409($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b409,2,$k3347,$sp-1);}}break;}}throw "bend: runtime fail-stop";}
function $k3347($v3347,$base,$td=0){const $v3343=$stArgs[$base+0];return ($td<64?$b409($v3343,$v3347,$td+1):run_named2($b409,$v3343,$v3347,$td));}
function $b410($v2,$td=0){const $v3349=({$:"Nil"});return ($td<64?$b409($v2,$v3349,$td+1):run_named2($b409,$v2,$v3349,$td));}
function $b411($v2,$v3,$td=0){$case3351:{const $v3352=($v2&&$v2.$==="Nil");if($v3352){return $v3;}else{break $case3351;}}$case3353:{const $v3354=($v2&&$v2.$==="Con");if($v3354){const $v3355=$v2.head;const $v3356=($v3355&&$v3355.$==="Tuple");if($v3356){const $v3357=$v3355.fst;const $v3359=$v3355.snd;const $v3361=$v2.tail;{const $a0=$v3,$a1=$v3357,$a2=$v3359;$stArgs[$sp++]=$v3361;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3363,$kb);try{return $split_done($b390($a0,$a1,$a2,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;$tailArgs[2]=$a2;return $split($b390,3,$k3363,$sp-1);}}else{break $case3353;}}else{break $case3353;}}throw "bend: runtime fail-stop";}
function $k3363($v3363,$base,$td=0){const $v3361=$stArgs[$base+0];return ($td<64?$b411($v3361,$v3363,$td+1):run_named2($b411,$v3361,$v3363,$td));}
function $b412($v2,$td=0){const $v3365=({$:"MTip"});return ($td<64?$b411($v2,$v3365,$td+1):run_named2($b411,$v2,$v3365,$td));}
function $b413($v2,$v3,$td=0){{const $a0=$v3;$stArgs[$sp++]=$v2;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3367,$kb);try{return $split_done($b408($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b408,1,$k3367,$sp-1);}}
function $k3367($v3367,$base,$td=0){const $v2=$stArgs[$base+0];return ($td<64?$b411($v3367,$v2,$td+1):run_named2($b411,$v3367,$v2,$td));}
function $b414($v2,$td=0){switch($v2?.$){case "MTip":{$case3369:{const $v3370=true;return 0;}break;}case "MLeaf":{$case3371:{const $v3372=true;const $v3373=$v2.key;const $v3375=$v2.val;return 1;}break;}case "MNode":{$case3377:{const $v3378=true;const $v3379=$v2.pos;const $v3381=$v2.lo;const $v3383=$v2.hi;{const $a0=$v3381;$stArgs[$sp++]=$v3383;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3385,$kb);try{return $split_done($b414($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b414,1,$k3385,$sp-1);}}break;}}throw "bend: runtime fail-stop";}
function $k3385($v3385,$base,$td=0){const $v3383=$stArgs[$base+0];{const $a0=$v3383;$stArgs[$sp++]=$v3385;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3386,$kb);try{return $split_done($b414($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b414,1,$k3386,$sp-1);}}
function $k3386($v3386,$base,$td=0){const $v3385=$stArgs[$base+0];const $v3387=$p_nat_add($v3385,$v3386);return $v3387;}
function $b415($v2,$v3,$td=0){switch($v2?.$){case "MTip":{$case3388:{const $v3389=true;return $v3;}break;}case "MLeaf":{$case3390:{const $v3391=true;const $v3392=$v2.key;const $v3394=$v2.val;const $v3396=({$:"Con","head":$v3394,"tail":$v3});return $v3396;}break;}case "MNode":{$case3397:{const $v3398=true;const $v3399=$v2.pos;const $v3401=$v2.lo;const $v3403=$v2.hi;{const $a0=$v3403,$a1=$v3;$stArgs[$sp++]=$v3401;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3405,$kb);try{return $split_done($b415($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b415,2,$k3405,$sp-1);}}break;}}throw "bend: runtime fail-stop";}
function $k3405($v3405,$base,$td=0){const $v3401=$stArgs[$base+0];return ($td<64?$b415($v3401,$v3405,$td+1):run_named2($b415,$v3401,$v3405,$td));}
function $b416($v2,$td=0){const $v3407=({$:"Nil"});return ($td<64?$b415($v2,$v3407,$td+1):run_named2($b415,$v2,$v3407,$td));}
function $b419($v0,$v1,$td=0){const $v3410=({$:"Unit"});return ($td<64?$b390($v0,$v1,$v3410,$td+1):run_named3($b390,$v0,$v1,$v3410,$td));}
function $b420($v0,$v1,$td=0){return ($td<64?$b393($v0,$v1,$td+1):run_named2($b393,$v0,$v1,$td));}
function $b421($v0,$v1,$td=0){return ($td<64?$b406($v0,$v1,$td+1):run_named2($b406,$v0,$v1,$td));}
function $b422($v0,$td=0){return ($td<64?$b414($v0,$td+1):run_named1($b414,$v0,$td));}
function $b423($v0,$td=0){return ($td<64?$b410($v0,$td+1):run_named1($b410,$v0,$td));}
function $b424($v0,$v1,$td=0){$case3416:{const $v3417=($v0&&$v0.$==="Nil");if($v3417){return $v1;}else{break $case3416;}}$case3418:{const $v3419=($v0&&$v0.$==="Con");if($v3419){const $v3420=$v0.head;const $v3422=$v0.tail;{const $a0=$v1,$a1=$v3420;$stArgs[$sp++]=$v3422;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3424,$kb);try{return $split_done($b419($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b419,2,$k3424,$sp-1);}}else{break $case3418;}}throw "bend: runtime fail-stop";}
function $k3424($v3424,$base,$td=0){const $v3422=$stArgs[$base+0];return ($td<64?$b424($v3422,$v3424,$td+1):run_named2($b424,$v3422,$v3424,$td));}
function $b425($v0,$td=0){const $v3426=$D["Set.new"];return ($td<64?$b424($v0,$v3426,$td+1):run_named2($b424,$v0,$v3426,$td));}
function $b426($v0,$td=0){const $v3428=({$:"Unit"});return $v3428;}
function $b427($v0,$v1,$v2,$v3,$td=0){$case3429:{const $v3430=($v0&&$v0.$==="Unit");if($v3430){const $v3431=($v1&&$v1.$==="Unit");if($v3431){const $v3432=($v2&&$v2.$==="Unit");if($v3432){const $v3433=($v3&&$v3.$==="Unit");if($v3433){const $v3434=({$:"Unit"});return $v3434;}else{break $case3429;}}else{break $case3429;}}else{break $case3429;}}else{break $case3429;}}throw "bend: runtime fail-stop";}
function $b483($c0,$v3442,$td=0){$case3443:{const $v3444=($v3442&&$v3442.$==="Pix");if($v3444){const $v3445=$v3442.color;const $v3447=({$:"Unit"});return $v3447;}else{break $case3443;}}$case3448:{const $v3449=($v3442&&$v3442.$==="Qua");if($v3449){const $v3450=$v3442.tl;const $v3452=$v3442.tr;const $v3454=$v3442.bl;const $v3456=$v3442.br;{const $a0=$c0,$a1=$v3450;$stArgs[$sp++]=$v3452;$stArgs[$sp++]=$v3454;$stArgs[$sp++]=$v3456;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-4,$ki=$split_enter($k3458,$kb);try{return $split_done($b428($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b428,2,$k3458,$sp-4);}}else{break $case3448;}}throw "bend: runtime fail-stop";}
function $k3458($v3458,$base,$td=0){const $v3452=$stArgs[$base+0];const $v3454=$stArgs[$base+1];const $v3456=$stArgs[$base+2];const $c0=$stArgs[$base+3];{const $a0=$c0,$a1=$v3452;$stArgs[$sp++]=$v3454;$stArgs[$sp++]=$v3456;$stArgs[$sp++]=$v3458;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-4,$ki=$split_enter($k3459,$kb);try{return $split_done($b428($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b428,2,$k3459,$sp-4);}}
function $k3459($v3459,$base,$td=0){const $v3454=$stArgs[$base+0];const $v3456=$stArgs[$base+1];const $v3458=$stArgs[$base+2];const $c0=$stArgs[$base+3];{const $a0=$c0,$a1=$v3454;$stArgs[$sp++]=$v3456;$stArgs[$sp++]=$v3458;$stArgs[$sp++]=$v3459;$stArgs[$sp++]=$c0;if($td<64){const $kb=$sp-4,$ki=$split_enter($k3460,$kb);try{return $split_done($b428($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b428,2,$k3460,$sp-4);}}
function $k3460($v3460,$base,$td=0){const $v3456=$stArgs[$base+0];const $v3458=$stArgs[$base+1];const $v3459=$stArgs[$base+2];const $c0=$stArgs[$base+3];{const $a0=$c0,$a1=$v3456;$stArgs[$sp++]=$v3458;$stArgs[$sp++]=$v3459;$stArgs[$sp++]=$v3460;if($td<64){const $kb=$sp-3,$ki=$split_enter($k3461,$kb);try{return $split_done($b428($a0,$a1,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;$tailArgs[1]=$a1;return $split($b428,2,$k3461,$sp-3);}}
function $k3461($v3461,$base,$td=0){const $v3458=$stArgs[$base+0];const $v3459=$stArgs[$base+1];const $v3460=$stArgs[$base+2];return ($td<64?$b427($v3458,$v3459,$v3460,$v3461,$td+1):run_named4($b427,$v3458,$v3459,$v3460,$v3461,$td));}
function $b428($v0,$v1,$td=0){$case3435:{const $v3436=$p_is_nat_zero($v0);if($v3436){return ($td<64?$b426($v1,$td+1):run_named1($b426,$v1,$td));}else{break $case3435;}}$case3438:{const $v3439=$p_is_nat_successor($v0);if($v3439){const $v3440=$p_nat_predecessor($v0);return ($td<64?$b483($v3440,$v1,$td+1):run_named2($b483,$v3440,$v1,$td));}else{break $case3438;}}throw "bend: runtime fail-stop";}
function $b429($v0,$td=0){return ($td<64?$b428(7,$v0,$td+1):run_named2($b428,7,$v0,$td));}
function $b430($v1,$v2,$v3,$td=0){$case3469:{const $v3470=($v3&&$v3.$==="None");if($v3470){const $v3471=$D["Window.close"];return run_tail($v3471,$v1);}else{break $case3469;}}$case3473:{const $v3474=($v3&&$v3.$==="Some");if($v3474){const $v3475=$v3.value;$stArgs[$sp++]=$v3475;return $split1($v2,$v1,$k3477,$sp-1);}else{break $case3473;}}throw "bend: runtime fail-stop";}
function $k3477($v3477,$base,$td=0){const $v3475=$stArgs[$base+0];return run_tail($v3477,$v3475);}
function $b485($c0,$c1,$v3,$td=0){return ($td<64?$b430($c0,$c1,$v3,$td+1):run_named3($b430,$c0,$c1,$v3,$td));}
function $b484($c0,$c1,$c2,$c3,$c4,$v3491,$td=0){$stArgs[$sp++]=$c2;$stArgs[$sp++]=$c3;$stArgs[$sp++]=$c4;return $split1($c0,$c1,$k3493,$sp-3);}
function $k3493($v3493,$base,$td=0){const $c2=$stArgs[$base+0];const $c3=$stArgs[$base+1];const $c4=$stArgs[$base+2];$stArgs[$sp++]=$c3;$stArgs[$sp++]=$c4;return $split1($v3493,$c2,$k3494,$sp-2);}
function $k3494($v3494,$base,$td=0){const $c3=$stArgs[$base+0];const $c4=$stArgs[$base+1];const $v3495=(($c0,$c1)=>run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b485($c0,$c1,$v3,$td+1):run_named3($b485,$c0,$c1,$v3,$td)),$raw,$base0,$sp0);}))($c3,$c4);return ($td<64?$b8($v3494,$v3495,$td+1):run_named2($b8,$v3494,$v3495,$td));}
function $b431($v1,$v2,$v3,$v4,$td=0){$case3479:{const $v3480=($v1&&$v1.$==="Tuple");if($v3480){const $v3481=$v1.fst;const $v3483=$v1.snd;const $v3484=($v3483&&$v3483.$==="Tuple");if($v3484){const $v3485=$v3483.fst;const $v3487=$v3483.snd;{const $a0=$v3485;$stArgs[$sp++]=$v2;$stArgs[$sp++]=$v3487;$stArgs[$sp++]=$v3;$stArgs[$sp++]=$v3481;$stArgs[$sp++]=$v4;if($td<64){const $kb=$sp-5,$ki=$split_enter($k3489,$kb);try{return $split_done($b429($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b429,1,$k3489,$sp-5);}}else{break $case3479;}}else{break $case3479;}}throw "bend: runtime fail-stop";}
function $k3489($v3489,$base,$td=0){const $v2=$stArgs[$base+0];const $v3487=$stArgs[$base+1];const $v3=$stArgs[$base+2];const $v3481=$stArgs[$base+3];const $v4=$stArgs[$base+4];{const $a0=$v3489;$stArgs[$sp++]=$v2;$stArgs[$sp++]=$v3487;$stArgs[$sp++]=$v3;$stArgs[$sp++]=$v3481;$stArgs[$sp++]=$v4;if($td<64){const $kb=$sp-5,$ki=$split_enter($k3490,$kb);try{return $split_done($b7($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b7,1,$k3490,$sp-5);}}
function $k3490($v3490,$base,$td=0){const $v2=$stArgs[$base+0];const $v3487=$stArgs[$base+1];const $v3=$stArgs[$base+2];const $v3481=$stArgs[$base+3];const $v4=$stArgs[$base+4];const $v3497=(($c0,$c1,$c2,$c3,$c4)=>run_clo(($v3491,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b484($c0,$c1,$c2,$c3,$c4,$v3491,$td+1):run_named6($b484,$c0,$c1,$c2,$c3,$c4,$v3491,$td)),$raw,$base0,$sp0);}))($v2,$v3487,$v3,$v3481,$v4);return ($td<64?$b8($v3490,$v3497,$td+1):run_named2($b8,$v3490,$v3497,$td));}
function $b486($c0,$c1,$c2,$v3508,$td=0){return ($td<64?$b431($v3508,$c0,$c1,$c2,$td+1):run_named4($b431,$v3508,$c0,$c1,$c2,$td));}
function $b432($v1,$v2,$v3,$v4,$td=0){$case3499:{const $v3500=($v2&&$v2.$==="Tuple");if($v3500){const $v3501=$v2.fst;const $v3503=$v2.snd;const $v3505=$D["Window.frame"];$stArgs[$sp++]=$v3503;$stArgs[$sp++]=$v3;$stArgs[$sp++]=$v3501;$stArgs[$sp++]=$v4;return $split1($v3505,$v1,$k3506,$sp-4);}else{break $case3499;}}throw "bend: runtime fail-stop";}
function $k3506($v3506,$base,$td=0){const $v3503=$stArgs[$base+0];const $v3=$stArgs[$base+1];const $v3501=$stArgs[$base+2];const $v4=$stArgs[$base+3];$stArgs[$sp++]=$v3;$stArgs[$sp++]=$v3501;$stArgs[$sp++]=$v4;return $split1($v3506,$v3503,$k3507,$sp-3);}
function $k3507($v3507,$base,$td=0){const $v3=$stArgs[$base+0];const $v3501=$stArgs[$base+1];const $v4=$stArgs[$base+2];const $v3511=(($c0,$c1,$c2)=>run_clo(($v3508,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b486($c0,$c1,$c2,$v3508,$td+1):run_named4($b486,$c0,$c1,$c2,$v3508,$td)),$raw,$base0,$sp0);}))($v3,$v3501,$v4);return ($td<64?$b8($v3507,$v3511,$td+1):run_named2($b8,$v3507,$v3511,$td));}
function $b433($v1,$v2,$v3,$v4,$td=0){$case3513:{const $v3514=($v1&&$v1.$==="App");if($v3514){const $v3515=$v1.view;const $v3517=$v1.tick;$stArgs[$sp++]=$v2;$stArgs[$sp++]=$v3517;$stArgs[$sp++]=$v4;return $split1($v3515,$v3,$k3519,$sp-3);}else{break $case3513;}}throw "bend: runtime fail-stop";}
function $k3519($v3519,$base,$td=0){const $v2=$stArgs[$base+0];const $v3517=$stArgs[$base+1];const $v4=$stArgs[$base+2];return ($td<64?$b432($v2,$v3519,$v3517,$v4,$td+1):run_named4($b432,$v2,$v3519,$v3517,$v4,$td));}
function $b434($v1,$v2,$td=0){$case3521:{const $v3522=($v2&&$v2.$==="None");if($v3522){const $v3523=({$:"None"});return ($td<64?$b7($v3523,$td+1):run_named1($b7,$v3523,$td));}else{break $case3521;}}$case3525:{const $v3526=($v2&&$v2.$==="Some");if($v3526){const $v3527=$v2.value;return run_tail($v1,$v3527);}else{break $case3525;}}throw "bend: runtime fail-stop";}
function $b487($c0,$v2,$td=0){return ($td<64?$b434($c0,$v2,$td+1):run_named2($b434,$c0,$v2,$td));}
function $b435($v1,$v2,$v3,$v4,$td=0){$case3530:{const $v3531=($v1&&$v1.$==="App");if($v3531){const $v3532=$v1.view;const $v3534=$v1.tick;$stArgs[$sp++]=$v3;$stArgs[$sp++]=$v4;return $split1($v3534,$v2,$k3536,$sp-2);}else{break $case3530;}}throw "bend: runtime fail-stop";}
function $k3536($v3536,$base,$td=0){const $v3=$stArgs[$base+0];const $v4=$stArgs[$base+1];$stArgs[$sp++]=$v4;return $split1($v3536,$v3,$k3537,$sp-1);}
function $k3537($v3537,$base,$td=0){const $v4=$stArgs[$base+0];const $v3538=(($c0)=>run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b487($c0,$v2,$td+1):run_named2($b487,$c0,$v2,$td)),$raw,$base0,$sp0);}))($v4);return ($td<64?$b8($v3537,$v3538,$td+1):run_named2($b8,$v3537,$v3538,$td));}
function $b488($c0,$v3540,$td=0){const $v3542=$p_u32_add($v3540,$c0);return $v3542;}
function $b436($v0,$td=0){const $v3543=(($c0)=>run_clo(($v3540,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b488($c0,$v3540,$td+1):run_named2($b488,$c0,$v3540,$td)),$raw,$base0,$sp0);}))($v0);return $v3543;}
function $b437($v0,$v1,$td=0){{const $a0=$v0;$stArgs[$sp++]=$v1;if($td<64){const $kb=$sp-1,$ki=$split_enter($k3544,$kb);try{return $split_done($b436($a0,$td+1),$ki,$td+1);}catch($e){$split_abort($ki,$kb);throw $e;}}$tailArgs[0]=$a0;return $split($b436,1,$k3544,$sp-1);}}
function $k3544($v3544,$base,$td=0){const $v1=$stArgs[$base+0];return run_tail($v3544,$v1);}
$D["Pair.fst"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b4($v2,$td+1):run_named1($b4,$v2,$td)),$raw,$base0,$sp0);});
$D["Pair.snd"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b5($v2,$td+1):run_named1($b5,$v2,$td)),$raw,$base0,$sp0);});
$D["IO.pure"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b7($v1,$td+1):run_named1($b7,$v1,$td)),$raw,$base0,$sp0);});
$D["IO.bind"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b8($v2,$v3,$td+1):run_named2($b8,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["IO.print"]=$f0=>$k=>({$:"IO.print",args:[str_out($f0)],kont:$k});
$D["IO.write"]=$f0=>$k=>({$:"IO.write",args:[str_out($f0)],kont:$k});
$D["IO.print_err"]=$f0=>$k=>({$:"IO.print_err",args:[str_out($f0)],kont:$k});
$D["IO.get_env"]=$f0=>$k=>({$:"IO.get_env",args:[str_out($f0)],kont:$k});
$D["IO.args"]=$k=>({$:"IO.args",args:[],kont:$k});
$D["IO.args_bytes"]=$k=>({$:"IO.args_bytes",args:[],kont:$k});
$D["Process.run"]=$f0=>$f1=>$f2=>$f3=>$f4=>$k=>({$:"Process.run",args:[str_out($f0),$f1,str_out($f2),$f3,$f4],kont:$k});
$D["IO.die"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b16($v1,$v2,$td+1):run_named2($b16,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["IO.exit"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b17($v0,$td+1):run_named1($b17,$v0,$td)),$raw,$base0,$sp0);});
$D["IO.pass"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b18($v1,$td+1):run_named1($b18,$v1,$td)),$raw,$base0,$sp0);});
$D["IO.try"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b19($v1,$td+1):run_named1($b19,$v1,$td)),$raw,$base0,$sp0);});
$D["IO.random_u32"]=$k=>({$:"IO.random_u32",args:[],kont:$k});
$D["IO.spawn"]=$f0=>$k=>({$:"IO.spawn",args:[$f0],kont:$k});
$D["IO.sleep"]=$f0=>$k=>({$:"IO.sleep",args:[$f0],kont:$k});
$D["IO.now"]=$k=>({$:"IO.now",args:[],kont:((x)=>$k(nat_in(x)))});
$D["IO.thread_count"]=$k=>({$:"IO.thread_count",args:[],kont:$k});
$D["Chan.new"]=$f0=>$k=>({$:"Chan.new",args:[$f0],kont:$k});
$D["Chan.send"]=$f0=>$f1=>$k=>({$:"Chan.send",args:[$f0,$f1],kont:$k});
$D["Chan.recv"]=$f0=>$k=>({$:"Chan.recv",args:[$f0],kont:$k});
$D["Chan.try_send"]=$f0=>$f1=>$f2=>$k=>({$:"Chan.try_send",args:[$f0,$f1,$f2],kont:$k});
$D["Chan.try_recv"]=$f0=>$f1=>$k=>({$:"Chan.try_recv",args:[$f0,$f1],kont:$k});
$D["Chan.close"]=$f0=>$k=>({$:"Chan.close",args:[$f0],kont:$k});
$D["IO.fork.go"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b31($v1,$v2,$td+1):run_named2($b31,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["IO.fork"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b32($v1,$td+1):run_named1($b32,$v1,$td)),$raw,$base0,$sp0);});
$D["IO.join.go"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b33($v1,$v2,$td+1):run_named2($b33,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["IO.join"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b34($v1,$td+1):run_named1($b34,$v1,$td)),$raw,$base0,$sp0);});
$D["IO.within"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b35($v1,$v2,$td+1):run_named2($b35,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["File.open"]=$f0=>$f1=>$k=>({$:"File.open",args:[str_out($f0),str_out($f1)],kont:$k});
$D["File.open_bytes"]=$f0=>$f1=>$k=>({$:"File.open_bytes",args:[$f0,str_out($f1)],kont:$k});
$D["File.read"]=$f0=>$f1=>$k=>({$:"File.read",args:[$f0,$f1],kont:$k});
$D["File.read_bytes"]=$f0=>$f1=>$k=>({$:"File.read_bytes",args:[$f0,$f1],kont:$k});
$D["File.read_at"]=$f0=>$f1=>$f2=>$k=>({$:"File.read_at",args:[$f0,$f1,$f2],kont:$k});
$D["File.size"]=$f0=>$k=>({$:"File.size",args:[$f0],kont:$k});
$D["File.write"]=$f0=>$f1=>$k=>({$:"File.write",args:[$f0,str_out($f1)],kont:$k});
$D["File.write_bytes"]=$f0=>$f1=>$k=>({$:"File.write_bytes",args:[$f0,$f1],kont:$k});
$D["File.close"]=$f0=>$k=>({$:"File.close",args:[$f0],kont:$k});
$D["TCP.listen"]=$f0=>$f1=>$k=>({$:"TCP.listen",args:[str_out($f0),$f1],kont:$k});
$D["TCP.accept"]=$f0=>$k=>({$:"TCP.accept",args:[$f0],kont:$k});
$D["TCP.try_accept"]=$f0=>$f1=>$k=>({$:"TCP.try_accept",args:[$f0,$f1],kont:$k});
$D["TCP.connect"]=$f0=>$f1=>$k=>({$:"TCP.connect",args:[str_out($f0),$f1],kont:$k});
$D["TCP.send"]=$f0=>$f1=>$k=>({$:"TCP.send",args:[$f0,str_out($f1)],kont:$k});
$D["TCP.try_send"]=$f0=>$f1=>$f2=>$k=>({$:"TCP.try_send",args:[$f0,str_out($f1),$f2],kont:$k});
$D["TCP.recv"]=$f0=>$f1=>$k=>({$:"TCP.recv",args:[$f0,$f1],kont:$k});
$D["TCP.try_recv"]=$f0=>$f1=>$f2=>$k=>({$:"TCP.try_recv",args:[$f0,$f1,$f2],kont:$k});
$D["TCP.send_bytes"]=$f0=>$f1=>$k=>({$:"TCP.send_bytes",args:[$f0,$f1],kont:$k});
$D["TCP.try_send_bytes"]=$f0=>$f1=>$f2=>$k=>({$:"TCP.try_send_bytes",args:[$f0,$f1,$f2],kont:$k});
$D["TCP.recv_bytes"]=$f0=>$f1=>$k=>({$:"TCP.recv_bytes",args:[$f0,$f1],kont:$k});
$D["TCP.try_recv_bytes"]=$f0=>$f1=>$f2=>$k=>({$:"TCP.try_recv_bytes",args:[$f0,$f1,$f2],kont:$k});
$D["UDP.bind"]=$f0=>$f1=>$k=>({$:"UDP.bind",args:[str_out($f0),$f1],kont:$k});
$D["UDP.send_to"]=$f0=>$f1=>$f2=>$f3=>$k=>({$:"UDP.send_to",args:[$f0,str_out($f1),$f2,str_out($f3)],kont:$k});
$D["UDP.try_send_to"]=$f0=>$f1=>$f2=>$f3=>$f4=>$k=>({$:"UDP.try_send_to",args:[$f0,str_out($f1),$f2,str_out($f3),$f4],kont:$k});
$D["UDP.send_bytes_to"]=$f0=>$f1=>$f2=>$f3=>$k=>({$:"UDP.send_bytes_to",args:[$f0,str_out($f1),$f2,$f3],kont:$k});
$D["UDP.try_send_bytes_to"]=$f0=>$f1=>$f2=>$f3=>$f4=>$k=>({$:"UDP.try_send_bytes_to",args:[$f0,str_out($f1),$f2,$f3,$f4],kont:$k});
$D["UDP.recv_from"]=$f0=>$f1=>$k=>({$:"UDP.recv_from",args:[$f0,$f1],kont:$k});
$D["UDP.try_recv_from"]=$f0=>$f1=>$f2=>$k=>({$:"UDP.try_recv_from",args:[$f0,$f1,$f2],kont:$k});
$D["UDP.recv_bytes_from"]=$f0=>$f1=>$k=>({$:"UDP.recv_bytes_from",args:[$f0,$f1],kont:$k});
$D["UDP.try_recv_bytes_from"]=$f0=>$f1=>$f2=>$k=>({$:"UDP.try_recv_bytes_from",args:[$f0,$f1,$f2],kont:$k});
$D["Socket.close"]=$f0=>$k=>({$:"Socket.close",args:[$f0],kont:$k});
$D["Listener.close"]=$f0=>$k=>({$:"Listener.close",args:[$f0],kont:$k});
$D["Window.open"]=$f0=>$f1=>$f2=>$k=>({$:"Window.open",args:[str_out($f0),$f1,$f2],kont:$k});
$D["Window.frame"]=$f0=>$f1=>$k=>({$:"Window.frame",args:[$f0,$f1],kont:$k});
$D["Window.set_title"]=$f0=>$f1=>$k=>({$:"Window.set_title",args:[$f0,str_out($f1)],kont:$k});
$D["Window.grab"]=$f0=>$f1=>$k=>({$:"Window.grab",args:[$f0,$f1],kont:$k});
$D["Window.close"]=$f0=>$k=>({$:"Window.close",args:[$f0],kont:$k});
$D["Audio.open"]=$f0=>$k=>({$:"Audio.open",args:[$f0],kont:$k});
$D["Audio.write"]=$f0=>$f1=>$k=>({$:"Audio.write",args:[$f0,$f1],kont:$k});
$D["Audio.close"]=$f0=>$k=>({$:"Audio.close",args:[$f0],kont:$k});
$D["Equal.cong"]=run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b76($v5,$td+1):run_named1($b76,$v5,$td)),$raw,$base0,$sp0);});
$D["Equal.sym"]=run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b77($v3,$td+1):run_named1($b77,$v3,$td)),$raw,$base0,$sp0);});
$D["Equal.trans"]=run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b78($v4,$v5,$td+1):run_named2($b78,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Empty.absurd"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b79($v1,$td+1):run_named1($b79,$v1,$td)),$raw,$base0,$sp0);});
$D["Bool.not"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b80($v0,$td+1):run_named1($b80,$v0,$td)),$raw,$base0,$sp0);});
$D["Bool.and"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b81($v0,$v1,$td+1):run_named2($b81,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Bool.or"]=(a)=>(b)=>a||b;
$TYPEF["Bool.or"]={n:2,q:[1,1],intrinsic:$D["Bool.or"]};
$D["Bool.xor"]=(a)=>(b)=>a!==b;
$TYPEF["Bool.xor"]={n:2,q:[1,1],intrinsic:$D["Bool.xor"]};
$D["Bool.cmp"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b84($v0,$v1,$td+1):run_named2($b84,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Bool.full_add"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b85($v0,$v1,$v2,$td+1):run_named3($b85,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Bool.pick"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b86($v1,$v2,$v3,$td+1):run_named3($b86,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Bool.to_u32"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b87($v0,$td+1):run_named1($b87,$v0,$td)),$raw,$base0,$sp0);});
$D["Cmp.is_lt"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b88($v0,$td+1):run_named1($b88,$v0,$td)),$raw,$base0,$sp0);});
$D["Cmp.is_eq"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b89($v0,$td+1):run_named1($b89,$v0,$td)),$raw,$base0,$sp0);});
$D["Cmp.is_gt"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b90($v0,$td+1):run_named1($b90,$v0,$td)),$raw,$base0,$sp0);});
$D["Cmp.is_le"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b91($v0,$td+1):run_named1($b91,$v0,$td)),$raw,$base0,$sp0);});
$D["Cmp.is_ge"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b92($v0,$td+1):run_named1($b92,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.double"]=(a)=>nat_chk(a+a);
$TYPEF["Nat.double"]={n:1,q:[1],intrinsic:$D["Nat.double"]};
$D["Nat.add"]=(a)=>(b)=>nat_chk(a+b);
$TYPEF["Nat.add"]={n:2,q:[1,1],intrinsic:$D["Nat.add"]};
$D["Nat.sub"]=(a)=>(b)=>(a<b?0:a-b);
$TYPEF["Nat.sub"]={n:2,q:[1,1],intrinsic:$D["Nat.sub"]};
$D["Nat.mul"]=(a)=>(b)=>nat_chk(a*b);
$TYPEF["Nat.mul"]={n:2,q:[1,2],intrinsic:$D["Nat.mul"]};
$D["Nat.divmod.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b97($v0,$v1,$v2,$v3,$td+1):run_named4($b97,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.divmod"]=(a)=>(b)=>nat_divmod(a,b);
$TYPEF["Nat.divmod"]={n:2,q:[1,1],intrinsic:$D["Nat.divmod"]};
$D["Nat.cmp"]=(a)=>(b)=>cmp_new(a,b);
$TYPEF["Nat.cmp"]={n:2,q:[1,1],intrinsic:$D["Nat.cmp"]};
$D["Nat.is_lt"]=(a)=>(b)=>a<b;
$TYPEF["Nat.is_lt"]={n:2,q:[1,1],intrinsic:$D["Nat.is_lt"]};
$D["Nat.is_eq"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b101($v0,$v1,$td+1):run_named2($b101,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.is_ne"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b102($v0,$v1,$td+1):run_named2($b102,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.is_le"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b103($v0,$v1,$td+1):run_named2($b103,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.is_gt"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b104($v0,$v1,$td+1):run_named2($b104,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.is_ge"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b105($v0,$v1,$td+1):run_named2($b105,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.min"]=(a)=>(b)=>(a<b?a:b);
$TYPEF["Nat.min"]={n:2,q:[2,2],intrinsic:$D["Nat.min"]};
$D["Nat.max"]=(a)=>(b)=>(a>b?a:b);
$TYPEF["Nat.max"]={n:2,q:[2,2],intrinsic:$D["Nat.max"]};
$D["Nat.ge_refl"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b108($v0,$td+1):run_named1($b108,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.max_ge_l"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b109($v0,$v1,$td+1):run_named2($b109,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.max_ge_r"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b110($v0,$v1,$td+1):run_named2($b110,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.div"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b111($v0,$v1,$td+1):run_named2($b111,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.mod"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b112($v0,$v1,$td+1):run_named2($b112,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.pow"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b113($v0,$v1,$td+1):run_named2($b113,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Maybe.pure"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b114($v2,$td+1):run_named1($b114,$v2,$td)),$raw,$base0,$sp0);});
$D["Maybe.bind"]=run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b115($v3,$v4,$td+1):run_named2($b115,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Maybe.default"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b116($v2,$v3,$td+1):run_named2($b116,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Maybe.is_some"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b117($v2,$td+1):run_named1($b117,$v2,$td)),$raw,$base0,$sp0);});
$D["Maybe.is_none"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b118($v2,$td+1):run_named1($b118,$v2,$td)),$raw,$base0,$sp0);});
$D["Maybe.map"]=run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b119($v3,$v4,$td+1):run_named2($b119,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Maybe.or"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b120($v2,$v3,$td+1):run_named2($b120,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Result.pure"]=run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b121($v4,$td+1):run_named1($b121,$v4,$td)),$raw,$base0,$sp0);});
$D["Result.bind"]=run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v6,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b122($v5,$v6,$td+1):run_named2($b122,$v5,$v6,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Result.default"]=run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b123($v4,$v5,$td+1):run_named2($b123,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Result.is_done"]=run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b124($v4,$td+1):run_named1($b124,$v4,$td)),$raw,$base0,$sp0);});
$D["Result.is_fail"]=run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b125($v4,$td+1):run_named1($b125,$v4,$td)),$raw,$base0,$sp0);});
$D["Result.map"]=run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v6,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b126($v5,$v6,$td+1):run_named2($b126,$v5,$v6,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.length"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b127($v2,$td+1):run_named1($b127,$v2,$td)),$raw,$base0,$sp0);});
$D["List.append"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b128($v2,$v3,$td+1):run_named2($b128,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.concat"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b129($v2,$td+1):run_named1($b129,$v2,$td)),$raw,$base0,$sp0);});
$D["List.reverse.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b130($v2,$v3,$td+1):run_named2($b130,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.reverse"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b131($v2,$td+1):run_named1($b131,$v2,$td)),$raw,$base0,$sp0);});
$D["List.is_empty"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b132($v2,$td+1):run_named1($b132,$v2,$td)),$raw,$base0,$sp0);});
$D["List.head"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b133($v2,$td+1):run_named1($b133,$v2,$td)),$raw,$base0,$sp0);});
$D["List.tail"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b134($v2,$td+1):run_named1($b134,$v2,$td)),$raw,$base0,$sp0);});
$D["List.last.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b135($v2,$v3,$td+1):run_named2($b135,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.last"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b136($v2,$td+1):run_named1($b136,$v2,$td)),$raw,$base0,$sp0);});
$D["List.get"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b137($v2,$v3,$td+1):run_named2($b137,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.set"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b138($v2,$v3,$v4,$td+1):run_named3($b138,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.take"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b139($v2,$v3,$td+1):run_named2($b139,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.drop"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b140($v2,$v3,$td+1):run_named2($b140,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.zip"]=run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b141($v4,$v5,$td+1):run_named2($b141,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.range.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b142($v0,$v1,$td+1):run_named2($b142,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.range"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b143($v0,$td+1):run_named1($b143,$v0,$td)),$raw,$base0,$sp0);});
$D["List.replicate"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b144($v1,$v2,$td+1):run_named2($b144,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.filter.put"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b145($v1,$v2,$v3,$td+1):run_named3($b145,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.any.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b146($v0,$v1,$td+1):run_named2($b146,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.all.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b147($v0,$v1,$td+1):run_named2($b147,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.find.if"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b148($v1,$v2,$v3,$td+1):run_named3($b148,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.merge.step"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v6,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b149($v1,$v2,$v3,$v4,$v5,$v6,$td+1):run_named6($b149,$v1,$v2,$v3,$v4,$v5,$v6,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["List.sort.runs"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b150($v1,$td+1):run_named1($b150,$v1,$td)),$raw,$base0,$sp0);});
$D["Word.zero"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b151($v0,$td+1):run_named1($b151,$v0,$td)),$raw,$base0,$sp0);});
$D["Word.not"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b152($v0,$v1,$td+1):run_named2($b152,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.and"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b153($v0,$v1,$v2,$td+1):run_named3($b153,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.or"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b154($v0,$v1,$v2,$td+1):run_named3($b154,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.xor"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b155($v0,$v1,$v2,$td+1):run_named3($b155,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.shl.put"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b156($v0,$v1,$v2,$td+1):run_named3($b156,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.shl"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b157($v0,$v1,$td+1):run_named2($b157,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.shl.out.con"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b158($v1,$v2,$td+1):run_named2($b158,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.shl.out"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b159($v0,$v1,$v2,$td+1):run_named3($b159,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.shr.pad"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b160($v0,$v1,$td+1):run_named2($b160,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.shr"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b161($v0,$v1,$td+1):run_named2($b161,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.cmp.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b162($v0,$v1,$v2,$td+1):run_named3($b162,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.cmp"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b163($v0,$v1,$v2,$td+1):run_named3($b163,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.inc"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b164($v0,$v1,$td+1):run_named2($b164,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.adc.con"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b165($v0,$v1,$v2,$v3,$v4,$td+1):run_named5($b165,$v0,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.adc"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b166($v0,$v1,$v2,$v3,$v4,$td+1):run_named5($b166,$v0,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.add"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b167($v0,$v1,$v2,$td+1):run_named3($b167,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.sub"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b168($v0,$v1,$v2,$td+1):run_named3($b168,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.add_comm.arm"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b169($v0,$v1,$v2,$v3,$td+1):run_named4($b169,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.add_comm.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b170($v0,$v1,$v2,$v3,$td+1):run_named4($b170,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.add_comm"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b171($v0,$v1,$v2,$td+1):run_named3($b171,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.to_nat"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b172($v0,$v1,$td+1):run_named2($b172,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.mul.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b173($v0,$v1,$v2,$v3,$v4,$td+1):run_named5($b173,$v0,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Word.mul"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b174($v0,$v1,$v2,$td+1):run_named3($b174,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.inc"]=(a)=>(a+1)>>>0;
$TYPEF["U32.inc"]={n:1,q:[1],intrinsic:$D["U32.inc"]};
$D["U32.add"]=(a)=>(b)=>((a+b)>>>0);
$TYPEF["U32.add"]={n:2,q:[1,1],intrinsic:$D["U32.add"]};
$D["U32.add_comm"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b177($v0,$v1,$td+1):run_named2($b177,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.sub"]=(a)=>(b)=>((a-b)>>>0);
$TYPEF["U32.sub"]={n:2,q:[1,1],intrinsic:$D["U32.sub"]};
$D["U32.mul"]=(a)=>(b)=>(Math.imul(a,b)>>>0);
$TYPEF["U32.mul"]={n:2,q:[1,1],intrinsic:$D["U32.mul"]};
$D["U32.not"]=(a)=>(~a)>>>0;
$TYPEF["U32.not"]={n:1,q:[1],intrinsic:$D["U32.not"]};
$D["U32.and"]=(a)=>(b)=>((a&b)>>>0);
$TYPEF["U32.and"]={n:2,q:[1,1],intrinsic:$D["U32.and"]};
$D["U32.or"]=(a)=>(b)=>((a|b)>>>0);
$TYPEF["U32.or"]={n:2,q:[1,1],intrinsic:$D["U32.or"]};
$D["U32.xor"]=(a)=>(b)=>((a^b)>>>0);
$TYPEF["U32.xor"]={n:2,q:[1,1],intrinsic:$D["U32.xor"]};
$D["U32.shl"]=(a)=>(a<<1)>>>0;
$TYPEF["U32.shl"]={n:1,q:[1],intrinsic:$D["U32.shl"]};
$D["U32.shr"]=(a)=>a>>>1;
$TYPEF["U32.shr"]={n:1,q:[1],intrinsic:$D["U32.shr"]};
$D["U32.shln"]=(a)=>(b)=>b>=32?0:(a<<b)>>>0;
$TYPEF["U32.shln"]={n:2,q:[1,1],intrinsic:$D["U32.shln"]};
$D["U32.shrn"]=(a)=>(b)=>b>=32?0:a>>>b;
$TYPEF["U32.shrn"]={n:2,q:[1,1],intrinsic:$D["U32.shrn"]};
$D["U32.cmp"]=(a)=>(b)=>cmp_new(a,b);
$TYPEF["U32.cmp"]={n:2,q:[1,1],intrinsic:$D["U32.cmp"]};
$D["U32.is_eq"]=(a)=>(b)=>a===b;
$TYPEF["U32.is_eq"]={n:2,q:[1,1],intrinsic:$D["U32.is_eq"]};
$D["U32.is_ne"]=(a)=>(b)=>a!==b;
$TYPEF["U32.is_ne"]={n:2,q:[1,1],intrinsic:$D["U32.is_ne"]};
$D["U32.is_lt"]=(a)=>(b)=>a<b;
$TYPEF["U32.is_lt"]={n:2,q:[1,1],intrinsic:$D["U32.is_lt"]};
$D["U32.is_le"]=(a)=>(b)=>a<=b;
$TYPEF["U32.is_le"]={n:2,q:[1,1],intrinsic:$D["U32.is_le"]};
$D["U32.is_gt"]=(a)=>(b)=>a>b;
$TYPEF["U32.is_gt"]={n:2,q:[1,1],intrinsic:$D["U32.is_gt"]};
$D["U32.is_ge"]=(a)=>(b)=>a>=b;
$TYPEF["U32.is_ge"]={n:2,q:[1,1],intrinsic:$D["U32.is_ge"]};
$D["U32.is_zero"]=(a)=>a===0;
$TYPEF["U32.is_zero"]={n:1,q:[1],intrinsic:$D["U32.is_zero"]};
$D["U32.to_nat"]=(a)=>a;
$TYPEF["U32.to_nat"]={n:1,q:[1],intrinsic:$D["U32.to_nat"]};
$D["U32.from_nat"]=(a)=>a>>>0;
$TYPEF["U32.from_nat"]={n:1,q:[1],intrinsic:$D["U32.from_nat"]};
$D["U32.log2.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b198($v0,$v1,$v2,$td+1):run_named3($b198,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.log2"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b199($v0,$td+1):run_named1($b199,$v0,$td)),$raw,$base0,$sp0);});
$D["U32.divmod.go.fin"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b200($v1,$v2,$v3,$v4,$td+1):run_named4($b200,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.divmod.go.shl"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b201($v1,$v2,$v3,$td+1):run_named3($b201,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.divmod.go.rec"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b202($v1,$v2,$v3,$td+1):run_named3($b202,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.divmod.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b203($v0,$v1,$v2,$td+1):run_named3($b203,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.div.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b204($v0,$td+1):run_named1($b204,$v0,$td)),$raw,$base0,$sp0);});
$D["U32.div.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b205($v0,$v1,$v2,$td+1):run_named3($b205,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.div"]=(a)=>(b)=>(b===0?0:(a/b)>>>0);
$TYPEF["U32.div"]={n:2,q:[1,1],intrinsic:$D["U32.div"]};
$D["U32.mod.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b207($v0,$td+1):run_named1($b207,$v0,$td)),$raw,$base0,$sp0);});
$D["U32.mod.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b208($v0,$v1,$v2,$td+1):run_named3($b208,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.mod"]=(a)=>(b)=>(b===0?a:a%b);
$TYPEF["U32.mod"]={n:2,q:[1,1],intrinsic:$D["U32.mod"]};
$D["U32.min"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b210($v0,$v1,$td+1):run_named2($b210,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.max"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b211($v0,$v1,$td+1):run_named2($b211,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.clamp"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b212($v0,$v1,$v2,$td+1):run_named3($b212,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.pow"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b213($v0,$v1,$td+1):run_named2($b213,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.is_even"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b214($v0,$td+1):run_named1($b214,$v0,$td)),$raw,$base0,$sp0);});
$D["U32.to_f32"]=(a)=>Math.fround(a);
$TYPEF["U32.to_f32"]={n:1,q:[1],intrinsic:$D["U32.to_f32"]};
$D["F32.to_u32"]=(a)=>(a>=1&&a<4294967296?Math.floor(a):0);
$TYPEF["F32.to_u32"]={n:1,q:[1],intrinsic:$D["F32.to_u32"]};
$D["F32.add"]=(a)=>(b)=>Math.fround(a+b);
$TYPEF["F32.add"]={n:2,q:[1,1],intrinsic:$D["F32.add"]};
$D["F32.sub"]=(a)=>(b)=>Math.fround(a-b);
$TYPEF["F32.sub"]={n:2,q:[1,1],intrinsic:$D["F32.sub"]};
$D["F32.mul"]=(a)=>(b)=>Math.fround(a*b);
$TYPEF["F32.mul"]={n:2,q:[1,1],intrinsic:$D["F32.mul"]};
$D["F32.div"]=(a)=>(b)=>Math.fround(a/b);
$TYPEF["F32.div"]={n:2,q:[1,1],intrinsic:$D["F32.div"]};
$D["F32.mod"]=(a)=>(b)=>Math.fround(a%b);
$TYPEF["F32.mod"]={n:2,q:[1,1],intrinsic:$D["F32.mod"]};
$D["F32.pow"]=(a)=>(b)=>f32_pow(a,b);
$TYPEF["F32.pow"]={n:2,q:[1,1],intrinsic:$D["F32.pow"]};
$D["F32.atan2"]=(a)=>(b)=>Math.fround(Math.atan2(a,b));
$TYPEF["F32.atan2"]={n:2,q:[1,1],intrinsic:$D["F32.atan2"]};
$D["F32.neg"]=(a)=>-a;
$TYPEF["F32.neg"]={n:1,q:[1],intrinsic:$D["F32.neg"]};
$D["F32.abs"]=(a)=>Math.fround(Math.abs(a));
$TYPEF["F32.abs"]={n:1,q:[1],intrinsic:$D["F32.abs"]};
$D["F32.sqrt"]=(a)=>Math.fround(Math.sqrt(a));
$TYPEF["F32.sqrt"]={n:1,q:[1],intrinsic:$D["F32.sqrt"]};
$D["F32.exp"]=(a)=>Math.fround(Math.exp(a));
$TYPEF["F32.exp"]={n:1,q:[1],intrinsic:$D["F32.exp"]};
$D["F32.log"]=(a)=>Math.fround(Math.log(a));
$TYPEF["F32.log"]={n:1,q:[1],intrinsic:$D["F32.log"]};
$D["F32.log2"]=(a)=>Math.fround(Math.log2(a));
$TYPEF["F32.log2"]={n:1,q:[1],intrinsic:$D["F32.log2"]};
$D["F32.log10"]=(a)=>Math.fround(Math.log10(a));
$TYPEF["F32.log10"]={n:1,q:[1],intrinsic:$D["F32.log10"]};
$D["F32.sin"]=(a)=>Math.fround(Math.sin(a));
$TYPEF["F32.sin"]={n:1,q:[1],intrinsic:$D["F32.sin"]};
$D["F32.cos"]=(a)=>Math.fround(Math.cos(a));
$TYPEF["F32.cos"]={n:1,q:[1],intrinsic:$D["F32.cos"]};
$D["F32.tan"]=(a)=>Math.fround(Math.tan(a));
$TYPEF["F32.tan"]={n:1,q:[1],intrinsic:$D["F32.tan"]};
$D["F32.asin"]=(a)=>Math.fround(Math.asin(a));
$TYPEF["F32.asin"]={n:1,q:[1],intrinsic:$D["F32.asin"]};
$D["F32.acos"]=(a)=>Math.fround(Math.acos(a));
$TYPEF["F32.acos"]={n:1,q:[1],intrinsic:$D["F32.acos"]};
$D["F32.atan"]=(a)=>Math.fround(Math.atan(a));
$TYPEF["F32.atan"]={n:1,q:[1],intrinsic:$D["F32.atan"]};
$D["F32.sinh"]=(a)=>Math.fround(Math.sinh(a));
$TYPEF["F32.sinh"]={n:1,q:[1],intrinsic:$D["F32.sinh"]};
$D["F32.cosh"]=(a)=>Math.fround(Math.cosh(a));
$TYPEF["F32.cosh"]={n:1,q:[1],intrinsic:$D["F32.cosh"]};
$D["F32.tanh"]=(a)=>Math.fround(Math.tanh(a));
$TYPEF["F32.tanh"]={n:1,q:[1],intrinsic:$D["F32.tanh"]};
$D["F32.floor"]=(a)=>Math.fround(Math.floor(a));
$TYPEF["F32.floor"]={n:1,q:[1],intrinsic:$D["F32.floor"]};
$D["F32.ceil"]=(a)=>Math.fround(Math.ceil(a));
$TYPEF["F32.ceil"]={n:1,q:[1],intrinsic:$D["F32.ceil"]};
$D["F32.trunc"]=(a)=>Math.fround(Math.trunc(a));
$TYPEF["F32.trunc"]={n:1,q:[1],intrinsic:$D["F32.trunc"]};
$D["F32.is_eq"]=(a)=>(b)=>a===b;
$TYPEF["F32.is_eq"]={n:2,q:[1,1],intrinsic:$D["F32.is_eq"]};
$D["F32.is_ne"]=(a)=>(b)=>a!==b;
$TYPEF["F32.is_ne"]={n:2,q:[1,1],intrinsic:$D["F32.is_ne"]};
$D["F32.is_lt"]=(a)=>(b)=>a<b;
$TYPEF["F32.is_lt"]={n:2,q:[1,1],intrinsic:$D["F32.is_lt"]};
$D["F32.is_le"]=(a)=>(b)=>a<=b;
$TYPEF["F32.is_le"]={n:2,q:[1,1],intrinsic:$D["F32.is_le"]};
$D["F32.is_gt"]=(a)=>(b)=>a>b;
$TYPEF["F32.is_gt"]={n:2,q:[1,1],intrinsic:$D["F32.is_gt"]};
$D["F32.is_ge"]=(a)=>(b)=>a>=b;
$TYPEF["F32.is_ge"]={n:2,q:[1,1],intrinsic:$D["F32.is_ge"]};
$D["F32.show"]=(a)=>f32_show(a);
$TYPEF["F32.show"]={n:1,q:[1],intrinsic:$D["F32.show"]};
$D["F32.bits"]=(a)=>f32_bits(a);
$TYPEF["F32.bits"]={n:1,q:[1],intrinsic:$D["F32.bits"]};
$D["F32.read"]=(a)=>f32_read(a);
$TYPEF["F32.read"]={n:1,q:[1],intrinsic:$D["F32.read"]};
$D["F32.min"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b252($v0,$v1,$td+1):run_named2($b252,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.max"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b253($v0,$v1,$td+1):run_named2($b253,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.clamp"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b254($v0,$v1,$v2,$td+1):run_named3($b254,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.lerp"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b255($v0,$v1,$v2,$td+1):run_named3($b255,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.lerp.zero"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b256($v0,$v1,$v2,$v3,$td+1):run_named4($b256,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.lerp.one"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b257($v0,$v1,$v2,$v3,$td+1):run_named4($b257,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.square"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b258($v0,$td+1):run_named1($b258,$v0,$td)),$raw,$base0,$sp0);});
$D["F32.hypot"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b259($v0,$v1,$td+1):run_named2($b259,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.round.zero"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b260($v0,$v1,$v2,$td+1):run_named3($b260,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.round"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b261($v0,$td+1):run_named1($b261,$v0,$td)),$raw,$base0,$sp0);});
Object.defineProperty($D,"F32.pi",{enumerable:true,configurable:true,get(){const $base0=$ksp,$sp0=$sp;return run_base((()=>{return f32_from_bits(1078530011);})(),$base0,$sp0);}});
$D["F32.from_nat"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b263($v0,$td+1):run_named1($b263,$v0,$td)),$raw,$base0,$sp0);});
$D["F32.to_nat.wide"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b264($v0,$v1,$td+1):run_named2($b264,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["F32.to_nat"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b265($v0,$td+1):run_named1($b265,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.cmp"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b266($v0,$v1,$td+1):run_named2($b266,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Char.to_u32"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b267($v0,$td+1):run_named1($b267,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.from_u32"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b268($v0,$td+1):run_named1($b268,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.is_eq"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b269($v0,$v1,$td+1):run_named2($b269,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Char.is_digit"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b270($v0,$td+1):run_named1($b270,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.is_upper"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b271($v0,$td+1):run_named1($b271,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.is_lower"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b272($v0,$td+1):run_named1($b272,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.is_alpha"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b273($v0,$td+1):run_named1($b273,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.is_space"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b274($v0,$td+1):run_named1($b274,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.to_upper"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b275($v0,$td+1):run_named1($b275,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.to_lower"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b276($v0,$td+1):run_named1($b276,$v0,$td)),$raw,$base0,$sp0);});
$D["String.append"]=(a)=>(b)=>a+b;
$TYPEF["String.append"]={n:2,q:[1,1],intrinsic:$D["String.append"]};
$D["String.cmp.rec"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b278($v0,$v1,$v2,$td+1):run_named3($b278,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.cmp"]=(a)=>(b)=>$p_string_cmp(a,b);
$TYPEF["String.cmp"]={n:2,q:[1,1],intrinsic:$D["String.cmp"]};
$D["String.cmp.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b280($v0,$v1,$v2,$td+1):run_named3($b280,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.cmp"]=(a)=>(b)=>$p_string_cmp(a,b);
$TYPEF["String.cmp"]={n:2,q:[1,1],intrinsic:$D["String.cmp"]};
$D["String.eq"]=(a)=>(b)=>a===b;
$TYPEF["String.eq"]={n:2,q:[1,1],intrinsic:$D["String.eq"]};
$D["String.length"]=(a)=>$p_string_length(a);
$TYPEF["String.length"]={n:1,q:[1],intrinsic:$D["String.length"]};
$D["String.is_empty"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b284($v0,$td+1):run_named1($b284,$v0,$td)),$raw,$base0,$sp0);});
$D["String.reverse.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b285($v0,$v1,$td+1):run_named2($b285,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.reverse"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b286($v0,$td+1):run_named1($b286,$v0,$td)),$raw,$base0,$sp0);});
$D["String.order.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b287($v0,$v1,$v2,$td+1):run_named3($b287,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.order"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b288($v0,$v1,$td+1):run_named2($b288,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.is_lt"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b289($v0,$v1,$td+1):run_named2($b289,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.is_le"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b290($v0,$v1,$td+1):run_named2($b290,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.is_gt"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b291($v0,$v1,$td+1):run_named2($b291,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.is_ge"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b292($v0,$v1,$td+1):run_named2($b292,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.starts_with.go.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b293($v0,$v1,$v2,$td+1):run_named3($b293,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.starts_with.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b294($v0,$v1,$td+1):run_named2($b294,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.starts_with"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b295($v0,$v1,$td+1):run_named2($b295,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.ends_with"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b296($v0,$v1,$td+1):run_named2($b296,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.contains.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b297($v0,$v1,$v2,$td+1):run_named3($b297,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.contains"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b298($v0,$v1,$td+1):run_named2($b298,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.take"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b299($v0,$v1,$td+1):run_named2($b299,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.drop"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b300($v0,$v1,$td+1):run_named2($b300,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.get"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b301($v0,$v1,$td+1):run_named2($b301,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.to_list"]=(text)=>$p_string_to_list(text);
$TYPEF["String.to_list"]={n:1,q:[1],intrinsic:$D["String.to_list"]};
$D["String.from_list"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b303($v0,$td+1):run_named1($b303,$v0,$td)),$raw,$base0,$sp0);});
$D["String.concat"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b304($v0,$td+1):run_named1($b304,$v0,$td)),$raw,$base0,$sp0);});
$D["String.join.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b305($v0,$v1,$v2,$td+1):run_named3($b305,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.join"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b306($v0,$v1,$td+1):run_named2($b306,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.split.push"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b307($v0,$v1,$td+1):run_named2($b307,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.split.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b308($v0,$v1,$v2,$td+1):run_named3($b308,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.split"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b309($v0,$v1,$td+1):run_named2($b309,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.lines"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b310($v0,$td+1):run_named1($b310,$v0,$td)),$raw,$base0,$sp0);});
$D["String.repeat"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b311($v0,$v1,$td+1):run_named2($b311,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.to_upper"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b312($v0,$td+1):run_named1($b312,$v0,$td)),$raw,$base0,$sp0);});
$D["String.to_lower"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b313($v0,$td+1):run_named1($b313,$v0,$td)),$raw,$base0,$sp0);});
$D["String.trim_start.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b314($v0,$v1,$v2,$td+1):run_named3($b314,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["String.trim_start"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b315($v0,$td+1):run_named1($b315,$v0,$td)),$raw,$base0,$sp0);});
$D["String.trim_end"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b316($v0,$td+1):run_named1($b316,$v0,$td)),$raw,$base0,$sp0);});
$D["String.trim"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b317($v0,$td+1):run_named1($b317,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.show.put"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b318($v0,$td+1):run_named1($b318,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.show.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b319($v0,$v1,$v2,$td+1):run_named3($b319,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.show.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b320($v0,$v1,$v2,$td+1):run_named3($b320,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.show"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b321($v0,$td+1):run_named1($b321,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.read.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b322($v0,$v1,$v2,$v3,$td+1):run_named4($b322,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.read.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b323($v0,$v1,$td+1):run_named2($b323,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.read.trim"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b324($v0,$td+1):run_named1($b324,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.read.fits"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b325($v0,$td+1):run_named1($b325,$v0,$td)),$raw,$base0,$sp0);});
$D["Nat.read.gate"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b326($v0,$v1,$td+1):run_named2($b326,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Nat.read"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b327($v0,$td+1):run_named1($b327,$v0,$td)),$raw,$base0,$sp0);});
$D["U32.show.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b328($v0,$v1,$v2,$v3,$td+1):run_named4($b328,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.show.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b329($v0,$v1,$v2,$td+1):run_named3($b329,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.show.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b330($v0,$v1,$td+1):run_named2($b330,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.show"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b331($v0,$td+1):run_named1($b331,$v0,$td)),$raw,$base0,$sp0);});
$D["U32.read.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b332($v0,$v1,$v2,$td+1):run_named3($b332,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.read.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b333($v0,$v1,$td+1):run_named2($b333,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["U32.read"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b334($v0,$td+1):run_named1($b334,$v0,$td)),$raw,$base0,$sp0);});
$D["Bool.show"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b335($v0,$td+1):run_named1($b335,$v0,$td)),$raw,$base0,$sp0);});
$D["Char.show"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b336($v0,$td+1):run_named1($b336,$v0,$td)),$raw,$base0,$sp0);});
$D["Array.size.node"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b337($v1,$v2,$td+1):run_named2($b337,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.size"]=(a)=>tuple(a,a.length);
$TYPEF["Array.size"]={n:2,q:[0,1],intrinsic:$D["Array.size"]};
$D["Array.swap.lo"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b339($v1,$v2,$td+1):run_named2($b339,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.swap.hi"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b340($v1,$v2,$td+1):run_named2($b340,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.swap.go"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b341($v1,$v2,$v3,$v4,$v5,$td+1):run_named5($b341,$v1,$v2,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.swap.at"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b342($v1,$v2,$v3,$td+1):run_named3($b342,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.swap"]=(a)=>(i)=>(v)=>array_swap(a,i,v);
$TYPEF["Array.swap"]={n:4,q:[0,1,2,1],intrinsic:$D["Array.swap"]};
$D["Array.clone.node"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b344($v1,$v2,$td+1):run_named2($b344,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.clone"]=(a)=>tuple(a,a.slice());
$TYPEF["Array.clone"]={n:2,q:[0,1],intrinsic:$D["Array.clone"]};
$D["Array.fork"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b346($v1,$td+1):run_named1($b346,$v1,$td)),$raw,$base0,$sp0);});
$D["Array.join"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b347($v1,$v2,$td+1):run_named2($b347,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.atomic.add"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>((o+v)>>>0));
$TYPEF["Array.atomic.add"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.add"]};
$D["Array.atomic.min"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>Math.min(o,v));
$TYPEF["Array.atomic.min"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.min"]};
$D["Array.atomic.max"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>Math.max(o,v));
$TYPEF["Array.atomic.max"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.max"]};
$D["Array.atomic.and"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>((o&v)>>>0));
$TYPEF["Array.atomic.and"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.and"]};
$D["Array.atomic.or"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>((o|v)>>>0));
$TYPEF["Array.atomic.or"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.or"]};
$D["Array.atomic.xor"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>((o^v)>>>0));
$TYPEF["Array.atomic.xor"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.xor"]};
$D["Array.atomic.exch"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>v);
$TYPEF["Array.atomic.exch"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.exch"]};
$D["Array.atomic.cas"]=(a)=>(i)=>(x)=>(v)=>array_rmw(a,i,(o)=>(o===x?v:o));
$TYPEF["Array.atomic.cas"]={n:4,q:[1,2,2,2],intrinsic:$D["Array.atomic.cas"]};
$D["Array.atomic.fadd"]=(a)=>(i)=>(v)=>array_rmw(a,i,(o)=>Math.fround(o+v));
$TYPEF["Array.atomic.fadd"]={n:3,q:[1,2,2],intrinsic:$D["Array.atomic.fadd"]};
$D["Array.new"]=(a)=>(b)=>array_new(a,b);
$TYPEF["Array.new"]={n:3,q:[0,2,2],intrinsic:$D["Array.new"]};
$D["Array.set.fin"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b358($v1,$td+1):run_named1($b358,$v1,$td)),$raw,$base0,$sp0);});
$D["Array.set"]=(a)=>(i)=>(v)=>(a[i%a.length]=v,a);
$TYPEF["Array.set"]={n:4,q:[0,1,1,1],intrinsic:$D["Array.set"]};
$D["Array.get.go"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b360($v1,$v2,$v3,$v4,$td+1):run_named4($b360,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.get.at"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b361($v1,$v2,$td+1):run_named2($b361,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Array.get"]=(a)=>(i)=>tuple(a,a[i%a.length]);
$TYPEF["Array.get"]={n:3,q:[0,1,2],intrinsic:$D["Array.get"]};
$D["Map.bit.u"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b363($v0,$v1,$td+1):run_named2($b363,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.bit.chr"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b364($v0,$v1,$td+1):run_named2($b364,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.bit.go.chr"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b365($v0,$v1,$td+1):run_named2($b365,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.bit.go.rec"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b366($v0,$v1,$td+1):run_named2($b366,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.bit.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b367($v0,$v1,$v2,$td+1):run_named3($b367,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.bit.at"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b368($v0,$v1,$td+1):run_named2($b368,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.bit"]=(key)=>(position)=>$p_map_bit(key,position);
$TYPEF["Map.bit"]={n:2,q:[1,1],intrinsic:$D["Map.bit"]};
$D["Map.msb.u.if"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b370($v0,$v1,$v2,$td+1):run_named3($b370,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.msb.u"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b371($v0,$v1,$td+1):run_named2($b371,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.diff.chr"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b372($v0,$td+1):run_named1($b372,$v0,$td)),$raw,$base0,$sp0);});
$D["Map.diff.step"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b373($v0,$v1,$td+1):run_named2($b373,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.diff.fin"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b374($v0,$v1,$v2,$td+1):run_named3($b374,$v0,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.diff"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b375($v0,$v1,$td+1):run_named2($b375,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
Object.defineProperty($D,"Map.new",{enumerable:true,configurable:true,get(){const $base0=$ksp,$sp0=$sp;return run_base((()=>{const $v2213=({$:"MTip"});return $v2213;})(),$base0,$sp0);}});
$D["Map.put.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b377($v2,$v3,$v4,$td+1):run_named3($b377,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.put"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b378($v2,$v3,$v4,$td+1):run_named3($b378,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.ins.splice.bit"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b379($v2,$v3,$v4,$v5,$td+1):run_named4($b379,$v2,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.ins.splice"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b380($v2,$v3,$v4,$v5,$td+1):run_named4($b380,$v2,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.ins.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v6,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b381($v2,$v3,$v4,$v5,$v6,$td+1):run_named5($b381,$v2,$v3,$v4,$v5,$v6,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.ins"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b382($v2,$v3,$v4,$v5,$td+1):run_named4($b382,$v2,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.lo"]=run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b383($v3,$v4,$v5,$td+1):run_named3($b383,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.hi"]=run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b384($v3,$v4,$v5,$td+1):run_named3($b384,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.seek.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b385($v2,$v3,$td+1):run_named2($b385,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.seek"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b386($v2,$v3,$td+1):run_named2($b386,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.set.fin.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b387($v2,$v3,$v4,$v5,$td+1):run_named4($b387,$v2,$v3,$v4,$v5,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.set.fin"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v5,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v6,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b388($v2,$v3,$v4,$v5,$v6,$td+1):run_named5($b388,$v2,$v3,$v4,$v5,$v6,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.set.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b389($v2,$v3,$td+1):run_named2($b389,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.set"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b390($v2,$v3,$v4,$td+1):run_named3($b390,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.has.leaf"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b391($v2,$v3,$td+1):run_named2($b391,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.has.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b392($v2,$v3,$td+1):run_named2($b392,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.has"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b393($v2,$v3,$td+1):run_named2($b393,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.get.leaf"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b394($v1,$v2,$v3,$td+1):run_named3($b394,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.get.go"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b395($v1,$v2,$v3,$td+1):run_named3($b395,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.get"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b396($v1,$v2,$v3,$td+1):run_named3($b396,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.find.leaf"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b397($v1,$v2,$td+1):run_named2($b397,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.find.node"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b398($v1,$v2,$v3,$td+1):run_named3($b398,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.find"]=(map)=>(key)=>$p_map_find(map,key);
$TYPEF["Map.find"]={n:3,q:[0,2,2],intrinsic:$D["Map.find"]};
$D["Map.pop.lo"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b400($v2,$v3,$v4,$td+1):run_named3($b400,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.pop.hi"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b401($v2,$v3,$v4,$td+1):run_named3($b401,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.pop.leaf"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b402($v2,$v3,$td+1):run_named2($b402,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.pop.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b403($v2,$v3,$td+1):run_named2($b403,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.pop"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b404($v2,$v3,$td+1):run_named2($b404,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.del.fin"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b405($v2,$td+1):run_named1($b405,$v2,$td)),$raw,$base0,$sp0);});
$D["Map.del"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b406($v2,$v3,$td+1):run_named2($b406,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.to_list.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b407($v2,$v3,$td+1):run_named2($b407,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.to_list"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b408($v2,$td+1):run_named1($b408,$v2,$td)),$raw,$base0,$sp0);});
$D["Map.keys.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b409($v2,$v3,$td+1):run_named2($b409,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.keys"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b410($v2,$td+1):run_named1($b410,$v2,$td)),$raw,$base0,$sp0);});
$D["Map.from_list.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b411($v2,$v3,$td+1):run_named2($b411,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.from_list"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b412($v2,$td+1):run_named1($b412,$v2,$td)),$raw,$base0,$sp0);});
$D["Map.union"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b413($v2,$v3,$td+1):run_named2($b413,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.size"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b414($v2,$td+1):run_named1($b414,$v2,$td)),$raw,$base0,$sp0);});
$D["Map.values.go"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b415($v2,$v3,$td+1):run_named2($b415,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Map.values"]=run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b416($v2,$td+1):run_named1($b416,$v2,$td)),$raw,$base0,$sp0);});
Object.defineProperty($D,"Set.new",{enumerable:true,configurable:true,get(){const $base0=$ksp,$sp0=$sp;return run_base((()=>{const $v3409=$D["Map.new"];return $v3409;})(),$base0,$sp0);}});
$D["Set.add"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b419($v0,$v1,$td+1):run_named2($b419,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Set.has"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b420($v0,$v1,$td+1):run_named2($b420,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Set.del"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b421($v0,$v1,$td+1):run_named2($b421,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Set.size"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b422($v0,$td+1):run_named1($b422,$v0,$td)),$raw,$base0,$sp0);});
$D["Set.to_list"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b423($v0,$td+1):run_named1($b423,$v0,$td)),$raw,$base0,$sp0);});
$D["Set.from_list.go"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b424($v0,$v1,$td+1):run_named2($b424,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Set.from_list"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b425($v0,$td+1):run_named1($b425,$v0,$td)),$raw,$base0,$sp0);});
$D["Image.sink"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b426($v0,$td+1):run_named1($b426,$v0,$td)),$raw,$base0,$sp0);});
$D["Image.drop.join"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b427($v0,$v1,$v2,$v3,$td+1):run_named4($b427,$v0,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Image.free"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b428($v0,$v1,$td+1):run_named2($b428,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["Image.drop"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b429($v0,$td+1):run_named1($b429,$v0,$td)),$raw,$base0,$sp0);});
$D["App.next"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b430($v1,$v2,$v3,$td+1):run_named3($b430,$v1,$v2,$v3,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["App.turn"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b431($v1,$v2,$v3,$v4,$td+1):run_named4($b431,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["App.draw"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b432($v1,$v2,$v3,$v4,$td+1):run_named4($b432,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["App.step"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b433($v1,$v2,$v3,$v4,$td+1):run_named4($b433,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["App.more"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b434($v1,$v2,$td+1):run_named2($b434,$v1,$v2,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["App.fold"]=run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v2,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v3,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v4,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b435($v1,$v2,$v3,$v4,$td+1):run_named4($b435,$v1,$v2,$v3,$v4,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
$D["adder"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b436($v0,$td+1):run_named1($b436,$v0,$td)),$raw,$base0,$sp0);});
$D["compute"]=run_clo(($v0,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(run_clo(($v1,$raw=undefined)=>{const $base0=$ksp,$sp0=$sp;return run_force(($td<64?$b437($v0,$v1,$td+1):run_named2($b437,$v0,$v1,$td)),$raw,$base0,$sp0);}),$raw,$base0,$sp0);});
export default {["compute"](){if(arguments.length!==2)return $curried($D["compute"],2,[],[],[],((v)=>v))(...arguments);const $base0=$ksp,$sp0=$sp;return run_base($b437(arguments[0],arguments[1]),$base0,$sp0);}};
