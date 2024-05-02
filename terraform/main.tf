# configured aws provider with proper credential
provider "aws" {
  region  = "eu-west-1"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.8.1"

  name = "spider-type-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

#   create_vpc = true
  #create_igw = true
  #enable_nat_gateway  = true
  #single_nat_gateway  = true
  tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

module "vpc_sg" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "spider-type-security-group"
  vpc_id      = module.vpc.vpc_id
  security_group_id = module.vpc.default_security_group_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      description = "spider-type-db-port"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      description = "SSH TCP"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      description = "http port"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      description = "secured https port"
      cidr_blocks = "0.0.0.0/0"
    }
  ]
  egress_with_cidr_blocks = [
    {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      description = "All traffic"
      cidr_blocks = "0.0.0.0/0"
    }
  ]

  tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

# create db subnet group before creating rds instance
module "db-subnet-group" {
  source  = "finisterra-io/db-subnet-group/aws"
  version = "1.0.1"

  name = "spider-type-db-subnet-group"
  subnet_ids = [module.vpc.public_subnets[0], module.vpc.public_subnets[1]]
  vpc_id = module.vpc.vpc_id
  vpc_name = module.vpc.name

  tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

# create the rds instance
module "db" {
  source                    = "terraform-aws-modules/rds/aws"
  identifier                = "spider-type-rds-instance"
  engine                    = "postgres"
  engine_version            = "16"
  family                    = "postgres16"
  major_engine_version      = "16"            
  instance_class            = "db.t3.micro"
  allocated_storage         = 20
  max_allocated_storage     = 30
  storage_encrypted         = false
  username                  = "postgres"
  db_name                   = "SpiderTypeDB"
  port                      = 5432
  publicly_accessible       = true
  db_subnet_group_name      = module.db-subnet-group.id 
  vpc_security_group_ids    = [module.vpc_sg.security_group_id]
  multi_az                  = false

  backup_retention_period   = 1
  skip_final_snapshot       = true
  deletion_protection       = false
  create_db_option_group    = false

  tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

module "ec2-instance" {
  source                       = "terraform-aws-modules/ec2-instance/aws"
  name                         = "spider-type-server-instance"
  key_name                     = module.key-pair.key_pair_name
  instance_type                = "t2.micro"
  ami_ssm_parameter            = "/aws/service/canonical/ubuntu/server/22.04/stable/current/amd64/hvm/ebs-gp2/ami-id"
  vpc_security_group_ids       = [module.vpc_sg.security_group_id]
  subnet_id                    = module.vpc.public_subnets[2]
  associate_public_ip_address  = true

  tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

module "ecr" {
 source = "terraform-aws-modules/ecr/aws"

 repository_name = "spider-type-ecr-repo"

 repository_lifecycle_policy = jsonencode({
   rules = [
     {
       rulePriority = 1,
       description  = "Keep last 7 images",
       selection = {
         tagStatus     = "tagged",
         tagPrefixList = ["v"],
         countType     = "imageCountMoreThan",
         countNumber   = 7
       },
       action = {
         type = "expire"
       }
     }
   ]
 })

 tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

module "iam_github_oidc_provider" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-github-oidc-provider"

  tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}

module "iam_github_oidc_role" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-github-oidc-role"

  subjects = ["AlexKruger2815/WhatTypeOfSpiderAreYou:*"]

  policies = {
    AdministratorAccess = "arn:aws:iam::aws:policy/AdministratorAccess"
  }

 tags = {
    owner = "alexander.kruger@bbd.co.za"
    created-using = "terraform"
  }
}