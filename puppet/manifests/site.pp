

class ceibanode {

  class { 'nodejs':
    version => 'v0.12.0',
  }

}

node 'ceibacms' {
  class { 'ceibanode':

  }

}
