
class ceibanode {

  class { 'nodejs':
    version => 'v0.12.0',
  }

  package { 'yo':
    provider => 'npm',
    require  => Class['nodejs'],
  }

  package { 'grunt-cli':
    provider => 'npm',
    require  => Class['nodejs'],
  }

  package { 'bower':
    provider => 'npm',
    require  => Class['nodejs'],
  }




}


class ceibamongo {

  file { '/data':
    path => '/data',
    ensure => 'directory'
  }

  file { '/data/db':
    require => File['/data'],
    path => '/data/db',
    ensure => 'directory'
  }

  class {'::mongodb::server':,
    require => File['/data/db'],
    port    => 27017,
    verbose => true,
  }

}


class ceibajava {

  #installs openjdk
  class { 'java':
    distribution => 'jdk',
  }

  class { "maven::maven":
    require => Class['java'],
    version => "3.2.5", # version to install
    # you can get Maven tarball from a Maven repository instead than from Apache servers, optionally with a user/password
    repo => {
      #url => "http://repo.maven.apache.org/maven2",
      #username => "",
      #password => "",
    }
  }

}



node 'ceibacms.dev' {

  include ceibamongo
  include ceibanode
  include ceibajava

}
